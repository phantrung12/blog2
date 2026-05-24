import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// ---------------------------------------------------------------------------
// Error types
// ---------------------------------------------------------------------------

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]> | string[];
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]> | string[];

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]> | string[],
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

/**
 * Get authorization headers from cookies for server-side requests.
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ---------------------------------------------------------------------------
// Core request handler (DRY + centralized error handling)
// ---------------------------------------------------------------------------

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const headers = await getAuthHeaders();
  const cookieStore = await cookies();

  try {
    const response = await axios<T>({
      ...config,
      headers: { ...headers, ...config.headers },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 500;
      const body = error.response?.data as ApiErrorResponse | undefined;
      const message = body?.message ?? error.message;
      const errors = body?.errors;

      // Log for server-side observability
      console.error(
        `[apiServer] ${config.method?.toUpperCase()} ${config.url} → ${status}: ${message}`,
      );

      // 401 Unauthorized → redirect to login
      if (status === 401) {
        cookieStore.delete("accessToken");
        cookieStore.delete("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        redirect("/login");
      }

      throw new ApiError(status, message, errors);
    }

    // Non-Axios errors (network failure, etc.)
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Server-side API client for use in Server Components and Server Actions.
 * Reads authentication token from cookies instead of localStorage.
 *
 * - Centralized error handling: throws `ApiError` with `statusCode`, `message`, `errors`.
 * - 401 responses automatically redirect to `/login`.
 *
 * @example
 *   const posts = await apiServer.get<Post[]>("/posts");
 *   const newPost = await apiServer.post<Post>("/posts", { title: "..." });
 *
 *   // Handling errors in Server Actions:
 *   try {
 *     await apiServer.post("/posts", data);
 *   } catch (error) {
 *     if (error instanceof ApiError) {
 *       console.log(error.statusCode, error.message, error.errors);
 *     }
 *   }
 */
const apiServer = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request<T>({
      ...config,
      method: "GET",
      url: `${API_BASE_URL}${url}`,
    });
  },

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return request<T>({
      ...config,
      method: "POST",
      url: `${API_BASE_URL}${url}`,
      data,
    });
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return request<T>({
      ...config,
      method: "PUT",
      url: `${API_BASE_URL}${url}`,
      data,
    });
  },

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return request<T>({
      ...config,
      method: "PATCH",
      url: `${API_BASE_URL}${url}`,
      data,
    });
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request<T>({
      ...config,
      method: "DELETE",
      url: `${API_BASE_URL}${url}`,
    });
  },
};

export default apiServer;
