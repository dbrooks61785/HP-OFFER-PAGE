export const API_BASE_URL = "https://api.haulpass.ezlumperservices.com";

export async function apiFetch(path: string, init?: RequestInit) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.headers ?? {}),
    },
  });
}

