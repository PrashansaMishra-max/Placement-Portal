import { useEffect, useState } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'

const useGetAllJobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                // Fetching active job profiles from your Express server database loop
                const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    setAllJobs(res.data.jobs);
                }
            } catch (error) {
                console.error("Error fetching database jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllJobs();
    }, []);

    return { allJobs, loading };
}

export default useGetAllJobs;