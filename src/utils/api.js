const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function authFetch(path, options = {}) {
  const token = localStorage.getItem('adminToken');

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}