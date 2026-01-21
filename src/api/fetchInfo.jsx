// ### API FETCH INFO DEV
//const apiBaseUrl = "http://localhost:3000/api/v1";

// ### API FETCH INFO PROD
const apiBaseUrl = "http://10.0.0.254:3000/api/v1";
import { handleResponse } from "./apiClient";

export async function fetchGlobalConfig() {
  const res = await fetch(`${apiBaseUrl}/global-config`);
  return handleResponse(res);
}

export async function createGlobalConfig(payload) {
  const res = await fetch(`${apiBaseUrl}/global-config`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function updateGlobalConfig(id, payload) {
  const res = await fetch(`${apiBaseUrl}/global-config/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function deleteGlobalConfig(id) {
  const res = await fetch(`${apiBaseUrl}/global-config/${id}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}

// DEVICES

export async function fetchDevices() {
  const res = await fetch(`${apiBaseUrl}/devices`);

  return handleResponse(res);
}

export async function createDevice(payload) {
  const res = await fetch(`${apiBaseUrl}/devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function updateDevice(id, payload) {
  const res = await fetch(`${apiBaseUrl}/devices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function deleteDevice(id) {
  const res = await fetch(`${apiBaseUrl}/devices/${id}`, {
    method: "DELETE",
  });

  return res;
}

export async function applyConfig() {
  const res = await fetch(`${apiBaseUrl}/apply-config`, {
    method: "GET",
  });
  return res;
}
