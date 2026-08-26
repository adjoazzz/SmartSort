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
      await supabase.auth.signOut();
      localStorage.removeItem("userRole");
      window.location.href = "/login";
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}
