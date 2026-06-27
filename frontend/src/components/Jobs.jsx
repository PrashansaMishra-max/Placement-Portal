import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('All');

    useEffect(() => {
        const fetchLiveJobs = async () => {
            try {
                // Request live data streaming from your Express API backend gateway
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`);
                setJobs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Pipeline error extracting backend job documents:", error);
                setLoading(false);
            }
        };
        fetchLiveJobs();
    }, []);

    // Reactive filter calculations processing your database arrays live
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = 
            (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (job.role && job.role.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesBranch = selectedBranch === 'All' || 
            (job.eligibleBranches && job.eligibleBranches.includes(selectedBranch));
        
        return matchesSearch && matchesBranch;
    });

    return (
        <div className="min-h-screen flex flex-col bg-transparent text-white pt-16">
            <Navbar />
            
            <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
                <div className="mb-10 space-y-4">
                    <h1 className="text-3xl font-black tracking-tight">Active Opportunities</h1>
                    <p className="text-gray-400 text-sm">Real-time parameters parsed directly from database tables.</p>
                    
                    {/* CONTROLS INPUT PANEL BLOCK */}
                    <div className="flex flex-col md:flex-row gap-4 pt-2">
                        <input 
                            type="text" 
                            placeholder="Search by company or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-discord-black border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-discord-blurple flex-grow transition-all"
                        />
                        <select 
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            className="bg-discord-black border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-discord-blurple md:w-48 transition-all"
                        >
                            <option value="All">All Branches</option>
                            <option value="CSE">CSE Only</option>
                            <option value="ECE">ECE Only</option>
                            <option value="EE">EE Only</option>
                            <option value="ME">ME Only</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 font-mono text-gray-500 animate-pulse">
                        🔄 Fetching live data matrices from Cluster0...
                    </div>
                ) : (
                    /* JOBS GRID DISPLAY LOOP */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div key={job._id || job.jobId} className="bg-discord-dark border border-white/5 rounded-xl p-6 flex flex-col justify-between transition-all hover:border-discord-blurple/40 shadow-xl">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs bg-white/5 text-gray-300 font-bold px-2.5 py-1 rounded">
                                            {job.company}
                                        </span>
                                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${job.status === 'Open' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{job.role}</h3>
                                    <p className="text-xs text-gray-400 mt-1">📍 {job.location || 'Remote'} • {job.domain}</p>
                                    
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {job.eligibleBranches && job.eligibleBranches.map((branch, idx) => (
                                            <span key={idx} className="text-[10px] bg-discord-black border border-white/5 font-bold text-discord-blurple px-2 py-0.5 rounded">
                                                {branch}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">CTC Package</span>
                                        <span className="text-sm font-extrabold text-white">₹{job.ctc || job['CTC (LPA)']} LPA</span>
                                    </div>
                                    <Link to={`/jobs/description/${job.jobId}`} className="bg-discord-blurple text-xs font-bold px-4 py-2.5 rounded hover:bg-[#4752C4] transition-all">
                                        View Criteria
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