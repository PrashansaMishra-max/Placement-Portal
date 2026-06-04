import { useEffect, useState } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'

const useGetAdminJobs = () => {
    const [adminJobs, setAdminJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                // Hits your backend controller designed to filter jobs by the logged-in recruiter's ID
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                if (res.data.success) {
                    setAdminJobs(res.data.jobs || []);
                }
            } catch (error) {
                console.error("Error streaming admin workspace directory:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminJobs();
    }, []);

    return { adminJobs, loading };
}

export default useGetAdminJobs;