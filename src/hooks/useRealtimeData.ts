import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";
import type { RealtimeChannel } from "@supabase/supabase-js";

type Fetcher<T> = () => Promise<T>;

type Options = {
  /** Supabase table names to subscribe to for realtime changes */
  tables: string[];
  /** Whether this hook is enabled (default: true) */
  enabled?: boolean;
};

/**
 * A React hook that fetches initial data from the backend API,
 * then subscribes to Supabase Realtime `postgres_changes` to
 * automatically re-fetch when the underlying data changes.
 *
 * This replaces the polling approach with instant push-based updates.
 */
export function useRealtimeData<T>(fetcher: Fetcher<T>, options: Options) {
  const { tables, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const fetcherRef = useRef(fetcher);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const isErrorToastShownRef = useRef(false);

  // Keep fetcher ref up to date so the realtime callback always
  // calls the latest version (which may have updated query params).
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const refresh = useCallback(async () => {
    try {
      const nextData = await fetcherRef.current();
      setData(nextData);
      setError(null);
      if (isErrorToastShownRef.current) {
        toast.success("Connection restored", { id: "realtime-error" });
        isErrorToastShownRef.current = false;
      }
      return nextData;
    } catch (nextError: any) {
      setError(nextError);
      if (!isErrorToastShownRef.current) {
        toast.error(
          `Sync failed: ${nextError.message || "Unable to reach server"}`,
          { id: "realtime-error", duration: 3000 },
        );
        isErrorToastShownRef.current = true;
      }
      throw nextError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    // 1. Initial fetch
    const doInitialFetch = async () => {
      setIsLoading(true);
      try {
        await refresh();
      } catch {
        // Error already handled in refresh()
      }
    };

    doInitialFetch();

    // 2. Subscribe to Supabase Realtime for each table
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const channelName = `realtime-${tables.sort().join("-")}-${Date.now()}-${uniqueId}`;
    let channel = supabase.channel(channelName);

    tables.forEach((table) => {
      channel = channel.on(
        "postgres_changes" as any,
        {
          event: "*",
          schema: "public",
          table,
        },
        () => {
          // When any change happens on this table, re-fetch from backend
          if (isMounted) {
            refresh().catch(() => {});
          }
        },
      );
    });

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.debug(`[Realtime] Subscribed to: ${tables.join(", ")}`);
      }
    });

    channelRef.current = channel;

    // 3. Cleanup on unmount
    return () => {
      isMounted = false;
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [enabled, tables.join(","), refresh]);

  return { data, isLoading, error, refresh };
}
