import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer' 
import { Link } from 'react-router-dom'

const Home = () => {
    // Temporary static data for demo, you'll map your backend jobs array here later!
    const sampleJobs = [
        { id: 1, title: "Full Stack Engineer", company: "Meta", location: "Remote", salary: "18-24 LPA", type: "Full-Time" },
        { id: 2, title: "Frontend Developer", company: "Vercel", location: "Delhi, IN", salary: "12-16 LPA", type: "Full-Time" },
        { id: 3, title: "UI/UX Product Designer", company: "Linear", location: "Bangalore, IN", salary: "14-20 LPA", type: "Contract" },
    ];

    return (
        /* CHANGED: bg-discord-gray updated to bg-transparent so the dynamic background shows through */
        <div className="min-h-screen flex flex-col bg-transparent text-white pt-16 selection:bg-discord-blurple">
            <Navbar />

            {/* MAIN GROWTH BODY BLOCK */}
            <main className="flex-grow">
                
                {/* HERO SECTION */}
                <header className="relative py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
                    <div className="space-y-6 z-10">
                        <span className="bg-discord-blurple/10 border border-discord-blurple/30 text-discord-blurple text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            🚀 2026 Recruitment Lifecycle Is Open
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
                            Land Your Dream Job. <br />
                            <span className="text-discord-blurple">Accelerate Your Career.</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-xl">
                            A modern placement ecosystem designed to connect campus talent directly with high-growth technology corporations. Post applications, manage interview loops, and track offers end-to-end.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link to="/jobs" className="bg-discord-blurple hover:bg-[#4752C4] px-6 py-3.5 rounded-lg font-bold transition-all shadow-lg shadow-discord-blurple/20">
                                Explore Job Openings
                            </Link>
                            <Link to="/signup" className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3.5 rounded-lg font-bold transition-all">
                                Register Workspace
                            </Link>
                        </div>
                    </div>

                    {/* VISUAL DASHBOARD MOCKUP PANEL */}
                    <div className="relative border border-white/5 rounded-xl bg-discord-dark p-6 shadow-2xl hidden lg:block">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">system_analytics.sh</span>
                        </div>
                        <div className="space-y-4 font-mono text-xs">
                            <p className="text-emerald-400">✓ Database Sync Status: Connected to Cluster0</p>
                            <p className="text-purple-400">ℹ Active Openings: 142 Listings Verified</p>
                            <p className="text-sky-400">ℹ Active Profiles: 1,208 Candidates Authenticated</p>
                            <div className="h-28 bg-discord-black rounded border border-white/5 p-3 flex flex-col justify-end">
                                <div className="flex items-end justify-between h-full gap-1">
                                    <div className="w-full bg-discord-blurple/30 h-[20%] rounded-t"></div>
                                    <div className="w-full bg-discord-blurple/40 h-[45%] rounded-t"></div>
                                    <div className="w-full bg-discord-blurple/60 h-[35%] rounded-t"></div>
                                    <div className="w-full bg-discord-blurple/50 h-[70%] rounded-t"></div>
                                    <div className="w-full bg-discord-blurple h-[95%] rounded-t"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* METRICS METERS BAR */}
                <section className="bg-discord-dark border-y border-white/5 py-12 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-black text-discord-blurple">94%</h3>
                            <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mt-2">Placement Rate</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white">45+ LPA</h3>
                            <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mt-2">Highest Package</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white">120+</h3>
                            <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mt-2">Hiring Corporates</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-discord-blurple">14 LPA</h3>
                            <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mt-2">Average CTC</p>
                        </div>
                    </div>
                </section>

                {/* LATEST JOBS TRACK */}
                <section className="max-w-7xl mx-auto py-20 px-6">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Featured Positions</h2>
                            <p className="text-gray-400 text-sm mt-1">Apply directly to highly sought-after active listings.</p>
                        </div>
                        <Link to="/jobs" className="text-sm font-bold text-discord-blurple hover:underline">
                            See All Openings →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sampleJobs.map((job) => (
                            <div key={job.id} className="bg-discord-dark border border-white/5 rounded-xl p-6 hover:border-discord-blurple/50 hover:shadow-xl hover:shadow-discord-blurple/5 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs bg-white/5 text-gray-300 font-bold px-2.5 py-1 rounded">
                                            {job.company}
                                        </span>
                                        <span className="text-xs text-emerald-400 bg-emerald-500/10 font-bold px-2 py-0.5 rounded-full">
                                            {job.type}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1">{job.title}</h3>
                                    <p className="text-xs text-gray-400">{job.location}</p>
                                </div>
                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                                    <span className="text-sm font-extrabold text-white">₹{job.salary}</span>
                                    <Link to={`/jobs/description/${job.id}`} className="bg-discord-blurple text-xs font-bold px-3 py-2 rounded hover:bg-[#4752C4] transition-all">
                                        Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
            </main>

            {/* FOOTER PLACEMENT */}
            <Footer />
        </div>
    )
}

export default Home;