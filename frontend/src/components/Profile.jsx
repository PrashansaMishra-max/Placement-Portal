import React, { useState } from 'react'
import Navbar from './shared/Navbar'

const Profile = () => {
    // 1. Fetch user data from localStorage session fallback
    const user = JSON.parse(localStorage.getItem("user")) || {
        fullname: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "9876543210",
        role: "student",
        profile: {
            skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
            resume: "https://example.com/mock-resume.pdf",
            resumeOriginalName: "John_Doe_Resume.pdf",
            profilePhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
        }
    };

    // Toggle logic for display states
    const hasResume = !!user.profile?.resume;

    return (
        <div className="min-h-screen bg-discord-gray text-white pt-24 px-6 mb-12 selection:bg-discord-blurple">
            <Navbar />

            <div className="max-w-3xl mx-auto bg-discord-dark border border-white/5 rounded-xl shadow-2xl overflow-hidden">
                {/* DECORATIVE TOP PROFILE BANNER */}
                <div className="h-32 bg-gradient-to-r from-discord-blurple to-[#4752C4] relative"></div>

                <div className="p-8 relative pt-0">
                    {/* AVATAR ROW PLACEMENT */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 -mt-16 mb-6">
                        <img 
                            src={user.profile?.profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"} 
                            alt="Profile Avatar" 
                            className="w-28 h-28 rounded-full object-cover border-4 border-discord-dark shadow-xl bg-discord-black"
                        />
                        <span className="bg-discord-blurple/10 border border-discord-blurple/30 text-discord-blurple text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider capitalize">
                            Authenticated {user.role}
                        </span>
                    </div>

                    {/* BIO CORE INFORMATION IDENTIFIERS */}
                    <div className="space-y-1 border-b border-white/5 pb-6">
                        <h1 className="text-3xl font-black tracking-tight">{user.fullname}</h1>
                        <p className="text-gray-400 text-sm font-medium">{user.email} • {user.phoneNumber}</p>
                    </div>

                    {/* TECHNICAL SKILLS TAG CONTAINER SECTION */}
                    <div className="py-6 border-b border-white/5 space-y-3">
                        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Technical Domains & Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.profile?.skills?.length > 0 ? (
                                user.profile.skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-discord-black px-3 py-1.5 rounded-md text-xs font-semibold border border-white/5 hover:border-discord-blurple/30 transition-all text-gray-200"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic">No targeted operational skills registered.</p>
                            )}
                        </div>
                    </div>

                    {/* DYNAMIC ATTACHED RESUME LOOP */}
                    <div className="py-6 space-y-3">
                        <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Academic Portfolio Document</h3>
                        {hasResume ? (
                            <div className="flex items-center justify-between bg-discord-black p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <span className="text-2xl text-rose-500">📄</span>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-white truncate">{user.profile?.resumeOriginalName || "Attached_Resume.pdf"}</p>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">Verified Document Link</p>
                                    </div>
                                </div>
                                <a 
                                    href={user.profile.resume} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-discord-blurple hover:bg-[#4752C4] px-4 py-2 rounded text-xs font-bold transition-all text-white whitespace-nowrap shrink-0"
                                >
                                    Download / View
                                </a>
                            </div>
                        ) : (
                            <div className="bg-discord-black/50 border border-dashed border-white/10 p-6 rounded-xl text-center">
                                <p className="text-xs text-gray-400">No primary resume file detected. Please upload an active PDF copy during registration/update cycles.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile