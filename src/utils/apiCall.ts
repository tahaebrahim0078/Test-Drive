const BASE_URL = "http://localhost:5000";

type ApiCallOptions = RequestInit & {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
};

export async function apiCall<T>(
  endpoint: string,
  options: ApiCallOptions = {}
): Promise<T> {
  const { query, headers, ...restOptions } = options;

  const queryString = query
    ? `?${new URLSearchParams(
        Object.entries(query)
          .filter(([_, value]) => value != null)
          .map(([k, v]) => [k, String(v)])
      ).toString()}`
    : "";

  const token = localStorage.getItem("token") || "";

  const res = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    ...restOptions,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }

  return res.json();
}
