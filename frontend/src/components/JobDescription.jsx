import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../utils/constant'

const JobDescription = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applied, setApplied] = useState(false);
    const [applying, setApplying] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
                if (res.data.success) {
                    setJob(res.data.job);
                    if (user && res.data.job.applications?.some(app => app.applicant === user._id)) {
                        setApplied(true);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch job:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const applyHandler = async () => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        setApplying(true);
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`, { withCredentials: true });
            if (res.data.success) {
                setApplied(true);
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to apply. Please try again.");
        } finally {
            setApplying(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-transparent text-white flex justify-center items-center">
            <p className="text-sm font-mono text-gray-500 animate-pulse">Loading job details...</p>
        </div>
    );

    if (!job) return (
        <div className="min-h-screen bg-transparent text-white flex flex-col justify-center items-center gap-4">
            <p className="text-lg text-gray-400">Job not found.</p>
            <Link to="/jobs" className="text-discord-blurple font-bold hover:underline">← Back to Listings</Link>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-transparent text-white pt-16">
            <Navbar />
            <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-12">
                <Link to="/jobs" className="text-xs text-gray-400 hover:text-discord-blurple font-bold transition-all mb-6 inline-block">← Back to Listings</Link>

                <div className="bg-discord-dark border border-white/5 rounded-xl p-8 space-y-6 shadow-2xl">
                    <div className="flex justify-between items-start border-b border-white/5 pb-6 flex-wrap gap-4">
                        <div>
                            <span className="text-xs bg-discord-blurple/10 text-discord-blurple border border-discord-blurple/20 px-3 py-1 rounded font-bold uppercase tracking-wider">
                                {job.company?.name || "Company"}
                            </span>
                            <h1 className="text-3xl font-black mt-2 tracking-tight">{job.title}</h1>
                            <p className="text-gray-400 text-sm mt-1">📍 {job.location || 'Remote'} • {job.jobType}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-gray-400 block">Salary</span>
                            <span className="text-2xl font-black text-emerald-400">₹{job.salary} LPA</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-discord-black border border-white/5 p-4 rounded-lg">
                            <span className="text-xs text-gray-400 block mb-1">Experience</span>
                            <span className="font-bold">{job.experienceLevel || 'Not specified'}</span>
                        </div>
                        <div className="bg-discord-black border border-white/5 p-4 rounded-lg">
                            <span className="text-xs text-gray-400 block mb-1">Openings</span>
                            <span className="font-bold">{job.position || '1'} positions</span>
                        </div>
                    </div>

                    {job.description && (
                        <div>
                            <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2">About the Role</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{job.description}</p>
                        </div>
                    )}

                    {job.requirements?.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-3">Requirements</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.requirements.map((req, i) => (
                                    <span key={i} className="bg-discord-black border border-white/5 text-discord-blurple text-xs font-bold px-3 py-1.5 rounded">
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-4 flex justify-between items-center">
                        <p className="text-xs text-gray-500 font-mono">ID: {job._id}</p>
                        {user?.role === 'student' && (
                            <button
                                onClick={applyHandler}
                                disabled={applied || applying}
                                className={`px-6 py-3 rounded-lg font-bold transition-all shadow-lg ${
                                    applied
                                        ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                                        : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/10'
                                }`}
                            >
                                {applied ? '✓ Already Applied' : applying ? 'Applying...' : 'Apply Now'}
                            </button>
                        )}
                        {!user && (
                            <Link to="/login" className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-bold transition-all">
                                Login to Apply
                            </Link>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default JobDescription;