import { useEffect, useState } from 'react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'

const useGetAppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                // Sends authorization cookie to fetch applications submitted by this student profile
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    setAppliedJobs(res.data.application || []);
                }
            } catch (error) {
                console.error("Error fetching student deployment history registries:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppliedJobs();
    }, []);

    return { appliedJobs, loading };
}

export default useGetAppliedJobs;