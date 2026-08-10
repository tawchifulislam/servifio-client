const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const json: ApiResponse<T> = await res.json();

  if (!res.ok || !json.success) {
    throw new ApiClientError(json.message || "Something went wrong");
  }

  return json.data as T;
}

export const api = {
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
  get: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};