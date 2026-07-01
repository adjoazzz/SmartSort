import { authFetch } from './authFetch';

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  maxRetries?: number;
  backoffDelayMs?: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    timeoutMs = 10000,
    maxRetries = 3,
    backoffDelayMs = 500,
    headers: initHeaders,
    ...restInit
  } = options;

  let attempt = 0;

  while (true) {
    attempt++;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const headers = new Headers(initHeaders);
      if (restInit.body && !(restInit.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
      }

      const response = await authFetch(url, {
        ...restInit,
        headers,
        signal: controller.signal,
      });

      if (!response.ok) {
        if ((response.status >= 500 || response.status === 429) && attempt < maxRetries) {
          const delay = backoffDelayMs * Math.pow(2, attempt - 1);
          await sleep(delay);
          continue;
        }

        let errorBody;
        try {
          errorBody = await response.json();
        } catch {
          errorBody = { error: { message: `HTTP Error ${response.status}` } };
        }
        throw new Error(errorBody?.error?.message || `Request failed with status ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (err: any) {
      const isNetworkOrTimeout = err.name === 'AbortError' || err.message?.includes('NetworkError') || err.message?.includes('fetch');
      if (isNetworkOrTimeout && attempt < maxRetries) {
        const delay = backoffDelayMs * Math.pow(2, attempt - 1);
        await sleep(delay);
        continue;
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

export const apiService = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, body: any, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: <T>(url: string, body: any, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body: any, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'DELETE' }),
};
export default apiService;
