import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant' 

const CreateJob = () => {
    // 1. Unified State Definition Matrix
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 1,
        companyId: "" 
    });
    
    const [companies, setCompanies] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const navigate = useNavigate();

    // 2. Fetch companies owned by this recruiter to populate the dropdown selection
    useEffect(() => {
        const fetchRecruiterCompanies = async () => {
            try {
                const companyEndPoint = JOB_API_END_POINT.replace('/job', '/company');
                const res = await axios.get(`${companyEndPoint}/get`, { withCredentials: true });
                
                if (res.data.success || res.data.companies) {
                    setCompanies(res.data.companies || []);
                }
            } catch (error) {
                console.error("Failed to sync recruiter workspace profiles:", error);
            } finally {
                setLoadingCompanies(false);
            }
        };
        fetchRecruiterCompanies();
    }, []);

    // 3. Track continuous input changes (DECLARED ONCE)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // 4. Dispatch processed parameters directly to your Express server database (DECLARED ONCE)
    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!input.companyId) {
            alert("Please assign a registered corporate workspace profile before deploying.");
            return;
        }

        try {
            // Processing requirements string into a clean array split by commas
            const jobData = {
                ...input,
                requirements: input.requirements.split(",").map(skill => skill.trim())
            };

            const res = await axios.post(`${JOB_API_END_POINT}/post`, jobData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                alert(res.data.message || "Job posted successfully!");
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to publish job opening.");
        }
    };

    return (
        <div className="min-h-screen bg-discord-gray text-white pt-24 px-6 mb-12 selection:bg-discord-blurple">
            <Navbar />

            <div className="max-w-3xl mx-auto bg-discord-dark border border-white/5 p-8 rounded-xl shadow-2xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-black tracking-tight">Publish New Position</h1>
                    <p className="text-gray-400 text-sm mt-1">Fill out the operational fields to distribute this career opening across the student database.</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Job Title</label>
                            <input 
                                type="text" name="title" value={input.title} onChange={changeEventHandler}
                                placeholder="e.g. Senior Frontend Engineer" required
                                className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm transition-all"
                            />
                        </div>

                        {/* Location Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Location</label>
                            <input 
                                type="text" name="location" value={input.location} onChange={changeEventHandler}
                                placeholder="e.g. Bangalore, IN or Remote" required
                                className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm transition-all"
                            />
                        </div>

                        {/* Salary Package */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Salary Package (LPA)</label>
                            <input 
                                type="text" name="salary" value={input.salary} onChange={changeEventHandler}
                                placeholder="e.g. 12-15 LPA" required
                                className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm transition-all"
                            />
                        </div>

                        {/* Job Type Dropdown */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Employment Commitment</label>
                            <select 
                                name="jobType" value={input.jobType} onChange={changeEventHandler} required
                                className="w-full bg-discord-black p-2.5 rounded border border-transparent outline-none text-sm cursor-pointer"
                            >
                                <option value="">Select Structure</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>

                        {/* Experience Level */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Experience Threshold</label>
                            <input 
                                type="text" name="experienceLevel" value={input.experienceLevel} onChange={changeEventHandler}
                                placeholder="e.g. 2+ Years, Freshers" required
                                className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm transition-all"
                            />
                        </div>

                        {/* Total Vacancies */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Total Open Positions</label>
                            <input 
                                type="number" name="position" value={input.position} onChange={changeEventHandler}
                                min="1" required
                                className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm transition-all"
                            />
                        </div>

                        {/* Corporate Company Workspace Selector */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase text-gray-400">Deploying Under Corporate Profile</label>
                            <select 
                                name="companyId" value={input.companyId} onChange={changeEventHandler} required
                                className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm cursor-pointer transition-all"
                            >
                                <option value="">Assign Workspace Entity</option>
                                {companies.map((company) => (
                                    <option key={company._id} value={company._id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            {companies.length === 0 && !loadingCompanies && (
                                <p className="text-xs text-amber-400 mt-1">⚠️ You must register a company profile first before deploying an open listing position.</p>
                            )}
                        </div>
                    </div>

                    {/* Technical Skill Requirements Tag Block */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Core Requirements (Comma Separated)</label>
                        <input 
                            type="text" name="requirements" value={input.requirements} onChange={changeEventHandler}
                            placeholder="React, Node.js, Express, MongoDB, AWS" required
                            className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm transition-all"
                        />
                    </div>

                    {/* Job Description Area */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">Role Profile & Responsibilities</label>
                        <textarea 
                            name="description" value={input.description} onChange={changeEventHandler} rows="4"
                            placeholder="Outline the detailed operational duties, standard stack requirements, and workflow expectations..." required
                            className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm resize-none transition-all"
                        ></textarea>
                    </div>

                    {/* Submit and Abort Row */}
                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button" onClick={() => navigate("/admin/dashboard")}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-sm font-bold py-3 rounded transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 bg-discord-blurple hover:bg-[#4752C4] text-white text-sm font-bold py-3 rounded transition-all shadow-lg"
                        >
                            Deploy Job Posting
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateJob;