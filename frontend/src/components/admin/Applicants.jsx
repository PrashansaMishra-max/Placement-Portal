import React from 'react'
import Navbar from '../shared/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import useGetJobApplicants from '../../hooks/useGetJobApplicants'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'

const Applicants = () => {
    const { id: jobId } = useParams();
    const navigate = useNavigate();
    const { applicantsData, setApplicantsData, loading } = useGetJobApplicants(jobId);

    // Status alteration handler loop
    const statusHandler = async (status, applicationId) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                alert(res.data.message || `Application status updated to ${status}`);
                
                // Optimistically update the local state UI matrix
                setApplicantsData(prev => {
                    if (!prev) return prev;
                    const updatedApplications = prev.applications.map(app => 
                        app._id === applicationId ? { ...app, status: status.toLowerCase() } : app
                    );
                    return { ...prev, applications: updatedApplications };
                });
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to update review status.");
        }
    };

    return (
        <div className="min-h-screen bg-discord-gray text-white pt-24 px-6 mb-12 selection:bg-discord-blurple">
            <Navbar />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* TOP HEADER BLOCK */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <button onClick={() => navigate(-1)} className="text-xs text-discord-blurple hover:underline font-mono mb-2 block">
                            ← Return to Dashboard Workspace
                        </button>
                        <h1 className="text-2xl font-black tracking-tight">
                            Candidate Profiles for: <span className="text-discord-blurple">{loading ? "..." : applicantsData?.title}</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-0.5">
                            Review academic credentials, view attached resumes, and update recruitment funnel pipelines.
                        </p>
                    </div>
                </div>

                {/* CANDIDATES TABLE GRID */}
                <div className="bg-discord-dark border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="text-lg font-bold">
                            Total Candidates: <span className="text-emerald-400">{applicantsData?.applications?.length || 0}</span>
                        </h3>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-400 font-mono text-sm">
                            Streaming candidate registry from database server...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-discord-black/50 text-xs font-bold uppercase text-gray-400 tracking-wider">
                                        <th className="p-4">Full Name</th>
                                        <th className="p-4">Email Address</th>
                                        <th className="p-4">Contact Info</th>
                                        <th className="p-4">Portfolio Document</th>
                                        <th className="p-4 text-right">Pipeline Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {applicantsData?.applications?.length > 0 ? (
                                        applicantsData.applications.map((app) => {
                                            const student = app.applicant;
                                            if (!student) return null;
                                            return (
                                                <tr key={app._id} className="hover:bg-white/[0.01] transition-colors">
                                                    <td className="p-4 font-bold text-white">{student.fullname}</td>
                                                    <td className="p-4 text-gray-300 font-mono">{student.email}</td>
                                                    <td className="p-4 text-gray-400">{student.phoneNumber || "N/A"}</td>
                                                    <td className="p-4">
                                                        {student.profile?.resume ? (
                                                            <a 
                                                                href={student.profile.resume} target="_blank" rel="noopener noreferrer"
                                                                className="text-discord-blurple hover:underline font-bold text-xs flex items-center gap-1"
                                                            >
                                                                📄 View Resume PDF
                                                            </a>
                                                        ) : (
                                                            <span className="text-xs text-gray-600 italic">No document attached</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex justify-end items-center gap-3">
                                                            {/* Current State Indicator */}
                                                            <span className={`text-xs uppercase px-2.5 py-1 rounded font-mono font-bold border ${
                                                                app.status === 'accepted' || app.status === 'shortlisted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                                app.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                            }`}>
                                                                {app.status || 'pending'}
                                                            </span>

                                                            {/* Dropdown Decision Menu */}
                                                            <select 
                                                                onChange={(e) => statusHandler(e.target.value, app._id)}
                                                                defaultValue=""
                                                                className="bg-discord-black border border-white/10 hover:border-discord-blurple/50 p-1.5 rounded text-xs cursor-pointer text-gray-300 outline-none transition-colors"
                                                            >
                                                                <option value="" disabled>Update Status</option>
                                                                <option value="Shortlisted">Shortlist Candidate</option>
                                                                <option value="Rejected">Reject Candidate</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-12 text-center text-gray-500 italic">
                                                No submissions have been registered for this position yet.
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

export default Applicants;