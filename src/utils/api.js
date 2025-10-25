const API_BASE_URL = 'https://notes-api.dicoding.dev/v1';

// Helper function to get access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Helper function to put access token to localStorage
const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// Helper function to remove access token from localStorage
const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

// Helper function to fetch API with error handling
const fetchWithToken = async (url, options = {}) => {
  const token = getAccessToken();
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

// API functions for authentication
export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message || 'Login failed');
    }

    return responseJson.data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message || 'Registration failed');
    }

    // Registration only returns success message, no user data
    return { success: true, message: responseJson.message };
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

// API functions for notes
export const getActiveNotes = async () => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

export const getArchivedNotes = async () => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

export const getNote = async (id) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

export const addNote = async ({ title, body }) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

export const archiveNote = async (id) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

export const unarchiveNote = async (id) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

export const deleteNote = async (id) => {
  const response = await fetchWithToken(`${API_BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

// API function to get current user data
export const getCurrentUser = async () => {
  const response = await fetchWithToken(`${API_BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
};

// Export helper functions
export { getAccessToken, putAccessToken, removeAccessToken };
