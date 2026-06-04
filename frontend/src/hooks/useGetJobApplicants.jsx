import { useEffect, useState } from 'react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'

const useGetJobApplicants = (jobId) => {
    const [applicantsData, setApplicantsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplicants = async () => {
            if (!jobId) return;
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, { withCredentials: true });
                if (res.data.success) {
                    setApplicantsData(res.data.job);
                }
            } catch (error) {
                console.error("Error retrieving applicant rosters:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [jobId]);

    return { applicantsData, setApplicantsData, loading };
}

export default useGetJobApplicants;