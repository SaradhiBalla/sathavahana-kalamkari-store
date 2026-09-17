const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers ?? {});

  if (!headers.has("Content-Type") && init?.body !== undefined && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const body =
    init?.body !== undefined && typeof init.body !== "string" && !(init.body instanceof FormData)
      ? JSON.stringify(init.body)
      : init?.body;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    body,
    headers,
    credentials: "include"
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed with status ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
