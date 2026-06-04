import React from 'react'
import Navbar from '../shared/Navbar'
import { Link } from 'react-router-dom'
import useGetAdminJobs from '../../hooks/useGetAdminJobs' // 1. Import our custom live hook

const RecruiterDashboard = () => {
    // 2. Stream live jobs directly from your MongoDB cluster
    const { adminJobs, loading } = useGetAdminJobs();

    // 3. Compute live metric totals dynamically
    const totalApplicants = adminJobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
    const averageApplications = adminJobs.length > 0 ? (totalApplicants / adminJobs.length).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-discord-gray text-white pt-24 px-6 selection:bg-discord-blurple">
            <Navbar />

            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* TOP ACTIONS ROW */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Recruiter Command Panel</h1>
                        <p className="text-gray-400 text-sm mt-1">Manage active listings, review incoming candidates, and publish corporate opportunities.</p>
                    </div>
                    <Link 
                        to="/admin/jobs/create" 
                        className="bg-discord-blurple hover:bg-[#4752C4] px-5 py-3 rounded-lg font-bold text-sm transition-all shadow-lg shadow-discord-blurple/10 flex items-center gap-2 self-stretch sm:self-auto text-center justify-center"
                    >
                        ➕ Post New Position
                    </Link>
                </div>

                {/* MANAGEMENT METRICS COUNTERS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-discord-dark border border-white/5 p-6 rounded-xl">
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Active Job Posts</p>
                        <h2 className="text-4xl font-black mt-2 text-discord-blurple">
                            {loading ? "..." : adminJobs.length}
                        </h2>
                    </div>
                    <div className="bg-discord-dark border border-white/5 p-6 rounded-xl">
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Total Resumes Received</p>
                        <h2 className="text-4xl font-black mt-2 text-emerald-400">
                            {loading ? "..." : totalApplicants}
                        </h2>
                    </div>
                    <div className="bg-discord-dark border border-white/5 p-6 rounded-xl">
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Average Application Rate</p>
                        <h2 className="text-4xl font-black mt-2 text-amber-400">
                            {loading ? "..." : averageApplications} <span className="text-sm font-normal text-gray-500">/ job</span>
                        </h2>
                    </div>
                </div>

                {/* POSTED JOBS MANAGEMENT GRID TABLE */}
                <div className="bg-discord-dark border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="text-lg font-bold">Active Workspace Directory</h3>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-400 font-mono text-sm">
                            Fetching your live placement registry...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-discord-black/50 text-xs font-bold uppercase text-gray-400 tracking-wider">
                                        <th className="p-4">Reference ID</th>
                                        <th className="p-4">Position Title</th>
                                        <th className="p-4">Date Deployed</th>
                                        <th className="p-4 text-center">Applicants Pool</th>
                                        <th className="p-4 text-right">Action Loops</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {adminJobs.length > 0 ? (
                                        adminJobs.map((job, index) => (
                                            <tr key={job._id} className="hover:bg-white/[0.01] transition-colors">
                                                <td className="p-4 font-mono text-discord-blurple font-bold">
                                                    JOB-{String(index + 101).padStart(3, '0')}
                                                </td>
                                                <td className="p-4">
                                                    <p className="font-bold text-white">{job.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{job.company?.name || "Your Company"}</p>
                                                </td>
                                                <td className="p-4 text-gray-400 font-mono">
                                                    {new Date(job.createdAt).toISOString().split('T')[0]}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded text-xs font-mono font-bold">
                                                        {job.applications?.length || 0} Candidates
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <Link 
                                                        to={`/admin/jobs/${job._id}/applicants`}
                                                        className="inline-block bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold px-3 py-2 rounded transition-all"
                                                    >
                                                        Review Profiles →
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-gray-500 italic">
                                                No listings deployed yet. Use the button above to publish your first opening!
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

export default RecruiterDashboard;