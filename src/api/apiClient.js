// apiClient.js
import { ApiError } from "./apiError";

export async function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  const data = await res.json(); // siempre es JSON, según tú
  throw new ApiError({
    message: data.message,
    status: res.status,
    code: data.HttpStatusError,
  });
}
