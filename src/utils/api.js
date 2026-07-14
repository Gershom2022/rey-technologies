const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function authFetch(path, options = {}) {
  // Try both possible token names
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || sessionStorage.getItem('token');
  
  // If no token, throw error
  if (!token) {
    throw new Error('No authentication token found. Please login.');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  });

  // Check if response is ok before parsing JSON
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // If unauthorized, clear token and redirect to login
    if (response.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Redirect to login if not already there
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
      throw new Error('Session expired. Please login again.');
    }
    
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  const data = await response.json();

  // Check for success flag in response
  if (data.success === false) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

// Regular fetch without auth (for public endpoints)
export async function publicFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
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