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
  const res = await fetch("http://localhost:3000/api/v1/global-config", {
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
  const res = await fetch(`http://localhost:3000/api/v1/global-config/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to delete: ${res.status} ${text}`);
  }
}
