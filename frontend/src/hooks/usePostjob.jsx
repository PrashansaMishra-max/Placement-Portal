import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { JOB_API_END_POINT } from '../utils/constant'

const usePostJob = () => {
    const navigate = useNavigate();

    const postNewJob = async (inputData) => {
        try {
            // Split requirements from comma string to array before dispatching
            const finalData = {
                ...inputData,
                requirements: typeof inputData.requirements === 'string' 
                    ? inputData.requirements.split(",").map(skill => skill.trim()) 
                    : inputData.requirements
            };

            const res = await axios.post(`${JOB_API_END_POINT}/post`, finalData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                alert(res.data.message || "Job specifications deployed successfully!");
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error("Error creating job profile database parameters:", error);
            alert(error.response?.data?.message || "Failed to publish job spec parameters.");
        }
    };

    return postNewJob;
}

export default usePostJob;