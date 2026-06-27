import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { JOB_API_END_POINT } from '../utils/constant'

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    setJobs(res.data.jobs || []);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job => {
        const search = searchTerm.toLowerCase();
        return (
            (job.title && job.title.toLowerCase().includes(search)) ||
            (job.company?.name && job.company.name.toLowerCase().includes(search)) ||
            (job.location && job.location.toLowerCase().includes(search))
        );
    });

    return (
        <div className="min-h-screen flex flex-col bg-transparent text-white pt-16">
            <Navbar />
            <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
                <div className="mb-10 space-y-4">
                    <h1 className="text-3xl font-black tracking-tight">Active Opportunities</h1>
                    <p className="text-gray-400 text-sm">Browse and apply for the latest openings.</p>
                    <input
                        type="text"
                        placeholder="Search by role, company or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-96 bg-discord-black border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-discord-blurple transition-all"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-20 font-mono text-gray-500 animate-pulse">
                        🔄 Fetching live openings...
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-4xl mb-4">🔍</p>
                        <p className="font-bold">No jobs found</p>
                        <p className="text-sm mt-2">Try a different search or check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div key={job._id} className="bg-discord-dark border border-white/5 rounded-xl p-6 flex flex-col justify-between transition-all hover:border-discord-blurple/40 hover:shadow-xl hover:shadow-discord-blurple/5">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs bg-white/5 text-gray-300 font-bold px-2.5 py-1 rounded">
                                            {job.company?.name || "Company"}
                                        </span>
                                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-emerald-400 bg-emerald-500/10">
                                            {job.jobType || "Full-Time"}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1">📍 {job.location || 'Remote'}</p>
                                    {job.requirements?.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {job.requirements.slice(0, 3).map((req, i) => (
                                                <span key={i} className="text-[10px] bg-discord-black border border-white/5 font-bold text-discord-blurple px-2 py-0.5 rounded">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                                    <div>
                                        <span className="text-xs text-gray-400 block">Salary</span>
                                        <span className="text-sm font-extrabold text-white">₹{job.salary} LPA</span>
                                    </div>
                                    <Link to={`/jobs/description/${job._id}`} className="bg-discord-blurple text-xs font-bold px-4 py-2.5 rounded hover:bg-[#4752C4] transition-all">
                                        View & Apply
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Jobs;