import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
    const { appliedJobs, loading } = useGetAppliedJobs();
    const user = JSON.parse(localStorage.getItem("user"));
    const [activeTab, setActiveTab] = useState('all');

    const total = appliedJobs.length;
    const pending = appliedJobs.filter(a => !a.status || a.status === 'pending').length;
    const shortlisted = appliedJobs.filter(a => a.status === 'accepted' || a.status === 'shortlisted').length;
    const rejected = appliedJobs.filter(a => a.status === 'rejected').length;
    const successRate = total > 0 ? Math.round((shortlisted / total) * 100) : 0;

    const filteredJobs = appliedJobs.filter(a => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return !a.status || a.status === 'pending';
        if (activeTab === 'shortlisted') return a.status === 'accepted' || a.status === 'shortlisted';
        if (activeTab === 'rejected') return a.status === 'rejected';
        return true;
    });

    const statusColor = (status) => {
        switch (status) {
            case 'accepted': case 'shortlisted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    };

    const profileFields = [
        !!user?.fullname,
        !!user?.email,
        !!user?.phoneNumber,
        !!user?.profile?.bio,
        !!(user?.profile?.skills?.length > 0),
        !!user?.profile?.resume,
        !!user?.profile?.profilePhoto,
    ];
    const profileComplete = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);

    // Mini bar chart data — last 6 months mock based on appliedJobs
    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const barData = months.map((m, i) => ({
        month: m,
        count: appliedJobs.filter(a => {
            const d = new Date(a.createdAt);
            return d.getMonth() === (1 + i) % 12;
        }).length
    }));
    const maxBar = Math.max(...barData.map(b => b.count), 1);

    return (
        <div className="min-h-screen flex flex-col bg-transparent text-white pt-16">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10 space-y-6">

                {/* Header — Profile Card */}
                <div className="bg-discord-dark border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <img
                                src={user?.profile?.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullname || 'U')}&background=5865F2&color=fff&size=100`}
                                alt="avatar"
                                className="w-16 h-16 rounded-2xl border-2 border-discord-blurple object-cover"
                            />
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-discord-dark"></span>
                        </div>
                        <div>
                            <p className="text-xs text-discord-blurple font-bold uppercase tracking-widest mb-0.5">Student</p>
                            <h1 className="text-2xl font-black tracking-tight">{user?.fullname || 'Student'}</h1>
                            <p className="text-gray-400 text-sm">{user?.email}</p>
                        </div>
                    </div>

                    {/* Profile Completion */}
                    <div className="md:w-64 space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-gray-400 uppercase tracking-wider">Profile Strength</span>
                            <span className={profileComplete === 100 ? 'text-emerald-400' : 'text-amber-400'}>{profileComplete}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${profileComplete === 100 ? 'bg-emerald-400' : 'bg-discord-blurple'}`}
                                style={{ width: `${profileComplete}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-500">
                            {profileComplete < 100 ? 'Complete your profile to improve visibility' : '✓ Profile complete'}
                        </p>
                        <Link to="/profile" className="inline-block text-[10px] font-bold text-discord-blurple hover:underline">
                            Edit Profile →
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Applied', value: total, color: 'text-discord-blurple', bg: 'border-discord-blurple/20', icon: '📨' },
                        { label: 'Pending', value: pending, color: 'text-amber-400', bg: 'border-amber-400/20', icon: '⏳' },
                        { label: 'Shortlisted', value: shortlisted, color: 'text-emerald-400', bg: 'border-emerald-400/20', icon: '✅' },
                        { label: 'Rejected', value: rejected, color: 'text-rose-400', bg: 'border-rose-400/20', icon: '❌' },
                    ].map((s, i) => (
                        <div key={i} className={`bg-discord-dark border ${s.bg} rounded-xl p-5 text-center hover:scale-[1.02] transition-transform`}>
                            <p className="text-2xl mb-1">{s.icon}</p>
                            <h2 className={`text-3xl font-black ${s.color}`}>{s.value}</h2>
                            <p className="text-xs text-gray-400 uppercase font-bold mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Middle Row — Chart + Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Activity Chart */}
                    <div className="md:col-span-2 bg-discord-dark border border-white/5 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider">Application Activity</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Last 6 months</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-discord-blurple">{successRate}%</p>
                                <p className="text-[10px] text-gray-500 uppercase">Success Rate</p>
                            </div>
                        </div>
                        <div className="flex items-end gap-3 h-28">
                            {barData.map((b, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-gray-500 font-mono">{b.count}</span>
                                    <div className="w-full rounded-t-md bg-discord-blurple/20 relative overflow-hidden" style={{ height: '80px' }}>
                                        <div
                                            className="absolute bottom-0 w-full bg-discord-blurple rounded-t-md transition-all"
                                            style={{ height: `${(b.count / maxBar) * 100}%`, minHeight: b.count > 0 ? '4px' : '0' }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-gray-500">{b.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-discord-dark border border-white/5 rounded-2xl p-6 space-y-3">
                        <h3 className="text-sm font-black uppercase tracking-wider mb-4">Quick Actions</h3>
                        {[
                            { label: 'Browse Jobs', desc: 'Find new openings', to: '/jobs', icon: '🔍', color: 'hover:border-discord-blurple/40' },
                            { label: 'Edit Profile', desc: 'Update your info', to: '/profile', icon: '✏️', color: 'hover:border-amber-400/30' },
                            { label: 'Help Center', desc: 'Got questions?', to: '/help', icon: '💬', color: 'hover:border-emerald-400/30' },
                        ].map((action, i) => (
                            <Link key={i} to={action.to}
                                className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 ${action.color} hover:bg-white/[0.02] transition-all`}>
                                <span className="text-xl">{action.icon}</span>
                                <div>
                                    <p className="text-sm font-bold">{action.label}</p>
                                    <p className="text-[10px] text-gray-500">{action.desc}</p>
                                </div>
            
                            </Link>
                        ))}

                        {/* Skills Preview */}
                        {user?.profile?.skills?.length > 0 && (
                            <div className="pt-3 border-t border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Your Skills</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {user.profile.skills.slice(0, 5).map((skill, i) => (
                                        <span key={i} className="text-[10px] bg-discord-blurple/10 text-discord-blurple border border-discord-blurple/20 px-2 py-0.5 rounded font-bold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-discord-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                        <h3 className="text-lg font-bold">Your Applications</h3>
                        <div className="flex gap-2 flex-wrap">
                            {['all', 'pending', 'shortlisted', 'rejected'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg capitalize transition-all ${
                                        activeTab === tab
                                            ? 'bg-discord-blurple text-white'
                                            : 'bg-white/5 text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-400 font-mono text-sm animate-pulse">
                            Loading your applications...
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                            <p className="text-4xl mb-3">📋</p>
                            <p className="font-bold text-white">No applications here</p>
                            <p className="text-sm mt-1 mb-6">
                                {activeTab === 'all' ? 'Start applying to jobs to track them here.' : `No ${activeTab} applications yet.`}
                            </p>
                            {activeTab === 'all' && (
                                <Link to="/jobs" className="bg-discord-blurple hover:bg-[#4752C4] px-5 py-2.5 rounded-lg text-sm font-bold transition-all text-white">
                                    Browse Jobs
                                </Link>
                            )}
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
                                        <th className="p-4">Salary</th>
                                        <th className="p-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {filteredJobs.map((app) => {
                                        const job = app.job;
                                        if (!job) return null;
                                        return (
                                            <tr key={app._id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="p-4 font-mono text-gray-400 text-xs">
                                                    {new Date(app.createdAt).toLocaleDateString('en-IN')}
                                                </td>
                                                <td className="p-4">
                                                    <Link to={`/jobs/description/${job._id}`} className="font-bold text-white group-hover:text-discord-blurple transition-colors">
                                                        {job.title}
                                                    </Link>
                                                </td>
                                                <td className="p-4 text-gray-300">{job.company?.name || '—'}</td>
                                                <td className="p-4 text-xs">
                                                    <span className="bg-white/5 text-gray-400 px-2 py-0.5 rounded font-medium">{job.jobType || '—'}</span>
                                                </td>
                                                <td className="p-4 text-xs font-bold text-emerald-400">
                                                    {job.salary ? `₹${job.salary} LPA` : '—'}
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