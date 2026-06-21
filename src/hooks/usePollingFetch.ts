import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Fetcher<T> = () => Promise<T>;

type Options = {
  intervalMs?: number;
  enabled?: boolean;
};

export function usePollingFetch<T>(fetcher: Fetcher<T>, options: Options = {}) {
  const { intervalMs = 15000, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const fetcherRef = useRef(fetcher);
  const timerRef = useRef<number | undefined>(undefined);
  const isErrorToastShownRef = useRef(false);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const refresh = useCallback(async () => {
    try {
      const nextData = await fetcherRef.current();
      setData(nextData);
      setError(null);
      if (isErrorToastShownRef.current) {
        toast.success("Connection restored", { id: "polling-error" });
        isErrorToastShownRef.current = false;
      }
      return nextData;
    } catch (nextError: any) {
      setError(nextError);
      if (!isErrorToastShownRef.current) {
        toast.error(`Sync failed: ${nextError.message || "Unable to reach server"}`, {
          id: "polling-error",
          duration: 2000,
        });
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

    const run = async () => {
      if (!isMounted) {
        return;
      }

      try {
        await refresh();
      } finally {
        if (!isMounted) {
          return;
        }

        timerRef.current = window.setTimeout(run, intervalMs);
      }
    };

    setIsLoading(true);
    void run();

    return () => {
      isMounted = false;
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [enabled, intervalMs, refresh]);

  return { data, isLoading, error, refresh };
}