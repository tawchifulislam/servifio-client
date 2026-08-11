const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiClientError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const json: ApiResponse<T> = await res.json();

  if (!res.ok || !json.success) {
    throw new ApiClientError(json.message || 'Something went wrong');
  }

  return json.data as T;
}

export const api = {
  get: <T>(endpoint: string, token?: string) => request<T>(endpoint, {}, token),
  post: <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, token),
  patch: <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>(
      endpoint,
      { method: 'PATCH', body: JSON.stringify(body) },
      token,
    ),
  delete: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, { method: 'DELETE' }, token),
};
