import { useCallback, useEffect, useRef, useState } from "react";

type Fetcher<T> = () => Promise<T>;

type Options = {
  intervalMs?: number;
  enabled?: boolean;
};

export function usePollingFetch<T>(fetcher: Fetcher<T>, options: Options = {}) {
  const { intervalMs = 5000, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const fetcherRef = useRef(fetcher);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const refresh = useCallback(async () => {
    try {
      const nextData = await fetcherRef.current();
      setData(nextData);
      setError(null);
      return nextData;
    } catch (nextError) {
      setError(nextError);
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