const API_URL = ''; // EMPTY - use relative paths

export async function authFetch(path, options = {}) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found. Please login.');
  }

  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/admin/login';
      throw new Error('Session expired. Please login again.');
    }
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function publicFetch(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}