import React from 'react'
import Navbar from './shared/Navbar'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs' // 1. Import our custom history hook

const StudentDashboard = () => {
    // 2. Consume live application vectors straight from MongoDB
    const { appliedJobs, loading } = useGetAppliedJobs();

    return (
        <div className="min-h-screen bg-discord-gray text-white pt-24 px-6 selection:bg-discord-blurple">
            <Navbar />

            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* ACCOUNT PROFILE CONDENSED GREETING */}
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Your Career Pipeline</h1>
                    <p className="text-gray-400 text-sm mt-1">Track the status, operational dates, and interview checkpoints for all your active job submissions.</p>
                </div>

                {/* TRACKING SYSTEM DIRECTORY GRID */}
                <div className="bg-discord-dark border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="text-lg font-bold">Submitted Framework Records</h3>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-400 font-mono text-sm">
                            Synchronizing pipeline status records...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-discord-black/50 text-xs font-bold uppercase text-gray-400 tracking-wider">
                                        <th className="p-4">Submission Date</th>
                                        <th className="p-4">Position Profile</th>
                                        <th className="p-4">Corporate Entity</th>
                                        <th className="p-4">Operational Contract</th>
                                        <th className="p-4 text-right">Recruitment State</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {appliedJobs.length > 0 ? (
                                        appliedJobs.map((app) => {
                                            const job = app.job;
                                            if (!job) return null; // Avoid crashes if a job was hard-deleted from DB
                                            
                                            return (
                                                <tr key={app._id} className="hover:bg-white/[0.01] transition-colors">
                                                    <td className="p-4 font-mono text-gray-400">
                                                        {new Date(app.createdAt).toISOString().split('T')[0]}
                                                    </td>
                                                    <td className="p-4 font-bold text-white">{job.title}</td>
                                                    <td className="p-4 text-gray-300">
                                                        {job.company?.name || "Corporate Workspace"}
                                                    </td>
                                                    <td className="p-4 text-xs">
                                                        <span className="bg-white/5 text-gray-400 px-2 py-0.5 rounded font-medium">
                                                            {job.jobType}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <span className={`text-xs uppercase px-2.5 py-1 rounded font-mono font-bold border ${
                                                            app.status === 'accepted' || app.status === 'shortlisted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                            app.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                        }`}>
                                                            {app.status || 'pending'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-12 text-center text-gray-500 italic">
                                                You haven't initiated any application logs yet. Head to the Browse board to begin!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard;