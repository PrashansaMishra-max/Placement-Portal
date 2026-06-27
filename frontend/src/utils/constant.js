// Change the port if your backend is running on something other than 8000
export const USER_API_END_POINT = axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user`);
export const JOB_API_END_POINT = axios.get(`${import.meta.env.VITE_API_URL}/api/v1/job`);

// --- ADD THIS LINE BELOW ---
export const APPLICATION_API_END_POINT = axios.get(`${import.meta.env.VITE_API_URL}/api/v1/application`);