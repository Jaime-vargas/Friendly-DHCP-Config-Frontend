const apiBaseUrl = "http://localhost:3000/api/v1";

export async function fetchGlobalConfig() {
  const res = await fetch(`${apiBaseUrl}/global-config`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch global config: ${res.status} ${res.statusText} ${text}`
    );
  }
  return res.json();
}

export async function createGlobalConfig(payload) {
  const res = await fetch(`${apiBaseUrl}/global-config`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to create: ${res.status} ${text}`);
  }

  return res.json();
}

export async function updateGlobalConfig(id, payload) {
  const res = await fetch(`${apiBaseUrl}/global-config/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to update config: ${res.status} ${res.statusText} ${text}`
    );
  }

  return res.json();
}

export async function deleteGlobalConfig(id) {
  const res = await fetch(`${apiBaseUrl}/global-config/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to delete: ${res.status} ${text}`);
  }
}

// DEVICES

export async function fetchDevices() {
  const res = await fetch(`${apiBaseUrl}/devices`);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch devices: ${res.status} ${text}`);
  }

  return res.json();
}

export async function createDevice(payload) {
  const res = await fetch(`${apiBaseUrl}/devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to create device: ${res.status} ${text}`);
  }

  return res.json();
}

export async function updateDevice(id, payload) {
  const res = await fetch(`${apiBaseUrl}/devices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to update device: ${res.status} ${text}`);
  }

  return res.json();
}

export async function deleteDevice(id) {
  const res = await fetch(`${apiBaseUrl}/devices/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to delete device: ${res.status} ${text}`);
  }
}
