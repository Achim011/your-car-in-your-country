const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(status: number, data: Record<string, unknown>) {
    super(getErrorMessage(data));
    this.status = status;
    this.data = data;
  }
}

function getErrorMessage(data: Record<string, unknown>): string {
  if (typeof data.detail === "string") return data.detail;
  if (typeof data.message === "string") return data.message;
  if (typeof data.non_field_errors === "object" && Array.isArray(data.non_field_errors)) {
    return data.non_field_errors.join(" ");
  }
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const value = data[firstKey];
    if (Array.isArray(value)) return String(value[0]);
    if (typeof value === "string") return value;
  }
  return "Une erreur est survenue.";
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
};

export async function apiRequest<T>(
  path: string,
  { method = "GET", body, token }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return data as T;
}

export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
};

export type AuthResponse = {
  token: string;
  user: User;
  message: string;
};

export function registerUser(payload: {
  username: string;
  email: string;
  first_name: string;
  password: string;
  password_confirm: string;
}) {
  return apiRequest<AuthResponse>("/auth/register/", {
    method: "POST",
    body: payload,
  });
}

export function loginUser(payload: { username: string; password: string }) {
  return apiRequest<AuthResponse>("/auth/login/", {
    method: "POST",
    body: payload,
  });
}

export function fetchCurrentUser(token: string) {
  return apiRequest<{ user: User }>("/auth/me/", { token });
}

export function logoutUser(token: string) {
  return apiRequest<{ message: string }>("/auth/logout/", {
    method: "POST",
    token,
  });
}
