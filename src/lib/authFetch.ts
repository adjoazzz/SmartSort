import { supabase } from "./supabaseClient";

export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(init?.headers);
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  // Abort after 30 seconds to prevent indefinite hangs
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(input, {
      ...init,
      headers,
      signal: init?.signal ?? controller.signal,
    });

    if (response.status === 401) {
      // Attempt to refresh the session before forcing logout
      try {
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (!refreshError && refreshData.session?.access_token) {
          const retryHeaders = new Headers(init?.headers);
          retryHeaders.set("Authorization", `Bearer ${refreshData.session.access_token}`);
          const retryResponse = await fetch(input, {
            ...init,
            headers: retryHeaders,
            signal: init?.signal ?? controller.signal,
          });

          if (retryResponse.status !== 401) {
            return retryResponse;
          }
        }
      } catch {
        // Refresh failed, proceed to sign out
      }

      await supabase.auth.signOut();
      localStorage.removeItem("userRole");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}
