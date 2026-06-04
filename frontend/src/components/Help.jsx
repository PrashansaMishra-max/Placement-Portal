import React from 'react'
import Navbar from './shared/Navbar'

const Help = () => {
    const faqs = [
        { q: "How do I attach a resume to my job application?", a: "Go to your account Profile workspace by clicking your profile picture in the top right corner. You can view or upload your primary academic portfolio document there." },
        { q: "Can recruiters view my profile before I submit an application?", a: "No. Your profile, resume link, and contact parameters remain completely hidden from recruiter search directories until you explicitly click the 'Apply to Position' button on a job post." },
        { q: "What do the different deployment pipeline states mean?", a: "Pending means your profile has been successfully routed to the corporate database. Shortlisted means the recruiter has accepted your credentials for interviews. Rejected implies the opening has been filled or locked." },
        { q: "How do I register a corporate entity workspace?", a: "Log in with an authorized Recruiter account role profile. On your dashboard workspace, click the company management suite to claim a new corporate namespace before publishing open job listings." }
    ];

    return (
        <div className="min-h-screen bg-discord-gray text-white pt-24 px-6 mb-12 selection:bg-discord-blurple">
            <Navbar />

            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Help & Knowledge Base</h1>
                    <p className="text-gray-400 text-sm mt-1">Find instructions for system setups, technical operations, and recruitment tracking parameters.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-discord-dark border border-white/5 p-6 rounded-xl space-y-2 shadow-xl">
                            <h3 className="text-base font-bold text-discord-blurple">Q: {faq.q}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Help;