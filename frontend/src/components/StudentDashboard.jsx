import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
    const { appliedJobs, loading } = useGetAppliedJobs();
    const user = JSON.parse(localStorage.getItem("user"));

    const statusColor = (status) => {
        switch(status) {
            case 'accepted': case 'shortlisted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-transparent text-white pt-16">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 space-y-8">

                <div className="bg-discord-dark border border-white/5 rounded-xl p-6 flex items-center gap-4">
                    <img
                        src={user?.profile?.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullname || 'U')}&background=5865F2&color=fff&size=80`}
                        alt="avatar"
                        className="w-14 h-14 rounded-full border-2 border-discord-blurple object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Hey, {user?.fullname?.split(' ')[0]} 👋</h1>
                        <p className="text-gray-400 text-sm mt-0.5">Track your applications and interview progress below.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-discord-dark border border-white/5 rounded-xl p-5 text-center">
                        <h2 className="text-3xl font-black text-discord-blurple">{appliedJobs.length}</h2>
                        <p className="text-xs text-gray-400 uppercase font-bold mt-1">Total Applied</p>
                    </div>
                    <div className="bg-discord-dark border border-white/5 rounded-xl p-5 text-center">
                        <h2 className="text-3xl font-black text-amber-400">{appliedJobs.filter(a => !a.status || a.status === 'pending').length}</h2>
                        <p className="text-xs text-gray-400 uppercase font-bold mt-1">Pending</p>
                    </div>
                    <div className="bg-discord-dark border border-white/5 rounded-xl p-5 text-center">
                        <h2 className="text-3xl font-black text-emerald-400">{appliedJobs.filter(a => a.status === 'accepted' || a.status === 'shortlisted').length}</h2>
                        <p className="text-xs text-gray-400 uppercase font-bold mt-1">Shortlisted</p>
                    </div>
                    <div className="bg-discord-dark border border-white/5 rounded-xl p-5 text-center">
                        <h2 className="text-3xl font-black text-rose-400">{appliedJobs.filter(a => a.status === 'rejected').length}</h2>
                        <p className="text-xs text-gray-400 uppercase font-bold mt-1">Rejected</p>
                    </div>
                </div>

                <div className="bg-discord-dark border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-lg font-bold">Your Applications</h3>
                        <Link to="/jobs" className="text-xs text-discord-blurple font-bold hover:underline">Browse More Jobs →</Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-400 font-mono text-sm animate-pulse">
                            Loading your applications...
                        </div>
                    ) : appliedJobs.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                            <p className="text-4xl mb-3">📋</p>
                            <p className="font-bold text-white">No applications yet</p>
                            <p className="text-sm mt-1 mb-6">Start applying to jobs to track them here.</p>
                            <Link to="/jobs" className="bg-discord-blurple hover:bg-[#4752C4] px-5 py-2.5 rounded-lg text-sm font-bold transition-all text-white">
                                Browse Jobs
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-discord-black/50 text-xs font-bold uppercase text-gray-400 tracking-wider">
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Position</th>
                                        <th className="p-4">Company</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {appliedJobs.map((app) => {
                                        const job = app.job;
                                        if (!job) return null;
                                        return (
                                            <tr key={app._id} className="hover:bg-white/[0.01] transition-colors">
                                                <td className="p-4 font-mono text-gray-400 text-xs">
                                                    {new Date(app.createdAt).toLocaleDateString('en-IN')}
                                                </td>
                                                <td className="p-4 font-bold text-white">{job.title}</td>
                                                <td className="p-4 text-gray-300">{job.company?.name || "—"}</td>
                                                <td className="p-4 text-xs">
                                                    <span className="bg-white/5 text-gray-400 px-2 py-0.5 rounded font-medium">{job.jobType}</span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className={`text-xs uppercase px-2.5 py-1 rounded font-mono font-bold border ${statusColor(app.status)}`}>
                                                        {app.status || 'pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default StudentDashboard;