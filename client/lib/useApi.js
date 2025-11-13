// Custom hook for making API requests

import { useCallback } from "react";

const API_URL = "/api";

export function useApi() {
  const request = useCallback(async (url, method = "GET", data) => {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (data) options.body = JSON.stringify(data);

    const res = await fetch(`${API_URL}${url}`, options);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  }, []);

  return {
    get: (url) => request(url),
    post: (url, data) => request(url, "POST", data),
    put: (url, data) => request(url, "PUT", data),
    del: (url) => request(url, "DELETE"),
  };
}
