import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/'; // Rails server URL

// User APIs
export const signUp = async (userData) => {
  return axios.post(`${API_BASE_URL}/sign_up`, { user: userData },{
    credentials: 'include',
    withCredentials: true,
  });
};

export const login = async (credentials) => {
  return axios.post(`${API_BASE_URL}/login`, { user: credentials },{
    credentials: 'include',
    withCredentials: true,
  });
};

export const logout = async () => {
  return axios.delete(`${API_BASE_URL}/logout`,{
    credentials: 'include',
    withCredentials: true,
  });
};

export const resendConfirmationEmail = async (email) => {
  return axios.post(`${API_BASE_URL}/confirmations`, { user: { email } },{
    credentials: 'include',
    withCredentials: true,
  });
};

// Task APIs
export const fetchTasks = async () => {
  return axios.get(`${API_BASE_URL}/api/tasks`,{
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
};

export const createTask = async (taskData) => {
  return axios.post(`${API_BASE_URL}/api/tasks`, { task: taskData },{
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
  });
};

export const updateTask = async (id, taskData) => {
  const { title, status, priority, due_date } = taskData; // ✅ Only required fields

  return axios.put(`${API_BASE_URL}/api/tasks/${id}`, 
    { task: { title, status, priority, due_date } }, // ✅ Excluding ID and timestamps
    { 
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  );
};



export const deleteTask = async (id) => {
  return axios.delete(`${API_BASE_URL}/api/tasks/${id}`,{
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
};

export const fetchFilteredTasks = async (filters) => {
  return axios.get(`${API_BASE_URL}/tasks/filtering`, {
    params: filters,  // Send filters as query params
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
};

export const fetchTaskOptions = async () => {
  return axios.get(`${API_BASE_URL}/tasks/options`, {
    credentials: 'include',
    withCredentials: true,
  });
};
