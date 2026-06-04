import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-discord-dark border-t border-white/5 text-gray-400 text-sm mt-auto selection:bg-discord-blurple">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* COLUMN 1: BRAND PLATFORM INFO */}
                <div className="space-y-3 md:col-span-1">
                    <Link to="/" className="text-lg font-black tracking-wider text-white hover:text-discord-blurple transition-colors">
                        CAREER<span className="text-discord-blurple">GRID</span>
                    </Link>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        A decentralized pipeline connecting elite campus students with real-time enterprise workspaces and career tracking logs.
                    </p>
                </div>

                {/* COLUMN 2: APPLICANT UTILITIES */}
                <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white">For Candidates</h4>
                    <ul className="space-y-1.5 text-xs">
                        <li><Link to="/jobs" className="hover:text-discord-blurple transition-colors">Browse Vacancies</Link></li>
                        <li><Link to="/dashboard" className="hover:text-discord-blurple transition-colors">Application Funnel</Link></li>
                        <li><Link to="/profile" className="hover:text-discord-blurple transition-colors">Academic Portfolio</Link></li>
                    </ul>
                </div>

                {/* COLUMN 3: CORPORATE UTILITIES */}
                <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white">For Recruiters</h4>
                    <ul className="space-y-1.5 text-xs">
                        <li><Link to="/admin/dashboard" className="hover:text-discord-blurple transition-colors">Command Center</Link></li>
                        <li><Link to="/admin/jobs/create" className="hover:text-discord-blurple transition-colors">Deploy Openings</Link></li>
                        <li><span className="text-gray-600 italic cursor-not-allowed">Enterprise Portal</span></li>
                    </ul>
                </div>

                {/* COLUMN 4: SUPPORT RESOURCES */}
                <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white">Resources</h4>
                    <ul className="space-y-1.5 text-xs">
                        <li><Link to="/help" className="hover:text-discord-blurple transition-colors">Help & FAQ</Link></li>
                        <li><Link to="/contact" className="hover:text-discord-blurple transition-colors">Contact Support</Link></li>
                        <li><span className="text-gray-600 font-mono">v1.4.2-stable</span></li>
                    </ul>
                </div>

            </div>

            {/* BOTTOM LOWER COPYRIGHT METRIC BAR */}
            <div className="w-full bg-discord-black/40 border-t border-white/[0.02] px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600 font-mono">
                    <p>© {currentYear} CareerGrid Network. All rights reserved.</p>
                    <div className="flex gap-4">
                        <span className="hover:text-gray-400 cursor-pointer">Security Ledger</span>
                        <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;