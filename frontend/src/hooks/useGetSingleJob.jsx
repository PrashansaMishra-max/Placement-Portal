import { useEffect, useState } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'

const useGetSingleJob = (jobId) => {
    const [singleJob, setSingleJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleJob = async () => {
            if (!jobId) return;
            try {
                // Querying individual job records using the backend request parameters layout
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    setSingleJob(res.data.job);
                }
            } catch (error) {
                console.error("Error retrieving individual job parameters:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleJob();
    }, [jobId]);

    return { singleJob, loading };
}

export default useGetSingleJob;