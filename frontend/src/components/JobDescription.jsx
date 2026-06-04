import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'

const JobDescription = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJob(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch target metadata sheet matrix:", error);
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-transparent text-white flex flex-col justify-center items-center">
                <p className="text-sm font-mono text-gray-500 animate-pulse">Syncing dynamic requirements bundle...</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-transparent text-white flex flex-col justify-center items-center">
                <p className="text-lg text-gray-400">Specified requirement metadata matrix profile not found.</p>
                <Link to="/jobs" className="mt-4 text-discord-blurple font-bold hover:underline">Return to Workspace</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-transparent text-white pt-16">
            <Navbar />
            <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-12">
                <Link to="/jobs" className="text-xs text-gray-400 hover:text-discord-blurple font-bold transition-all mb-6 inline-block">← Back to Listings</Link>
                
                <div className="bg-discord-dark border border-white/5 rounded-xl p-8 space-y-6 shadow-2xl">
                    <div className="flex justify-between items-start border-b border-white/5 pb-6">
                        <div>
                            <span className="text-xs bg-discord-blurple/10 text-discord-blurple border border-discord-blurple/20 px-3 py-1 rounded font-bold uppercase tracking-wider">{job.company} Matrix</span>
                            <h1 className="text-3xl font-black mt-2 tracking-tight">{job.role}</h1>
                            <p className="text-gray-400 text-sm mt-1">Operational Workspace Location: {job.location || 'Remote'}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-gray-400 block">Offer Compensation</span>
                            <span className="text-2xl font-black text-emerald-400">₹{job.ctc} LPA</span>
                        </div>
                    </div>

                    {/* GATEKEEPER SPECIFICATION GRIDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        <div className="bg-discord-black border border-white/5 p-4 rounded-lg">
                            <span className="text-xs text-gray-400 block mb-1">Academic Threshold Minimum</span>
                            <span className="text-base font-bold text-white">{job.minCgpa || job.minCGPA} CGPA Scale</span>
                        </div>
                        <div className="bg-discord-black border border-white/5 p-4 rounded-lg">
                            <span className="text-xs text-gray-400 block mb-1">Application Pipeline Windows</span>
                            <span className="text-base font-bold text-rose-400">Closes: {job.deadline || 'TBD'}</span>
                        </div>
                        <div className="bg-discord-black border border-white/5 p-4 rounded-lg">
                            <span className="text-xs text-gray-400 block mb-1">Hiring Openings Limit</span>
                            <span className="text-base font-bold text-white">{job.openings || 'Not Specified'} Active Heads</span>
                        </div>
                        <div className="bg-discord-black border border-white/5 p-4 rounded-lg">
                            <span className="text-xs text-gray-400 block mb-1">Corporate Relations Representative</span>
                            <span className="text-base font-bold text-discord-blurple">{job.contactPerson || 'HR Management'} ({job.contactEmail})</span>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                        <p className="text-xs text-gray-500 font-mono">System Schema Key Reference: {job._id}</p>
                        <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-emerald-500/10">
                            Apply for Role
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default JobDescription;