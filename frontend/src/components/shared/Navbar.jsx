import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    
    // Parse the authenticated user session
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const logoutHandler = () => {
        localStorage.removeItem("user");
        // Clear any stored cookies if your backend uses token-based sessions
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert("Logged out securely.");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-discord-dark/90 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between z-50 selection:bg-discord-blurple">
            {/* PLATFORM LOGO BUTTON */}
            <Link to="/" className="text-xl font-black tracking-wider text-white hover:text-discord-blurple transition-colors">
                CAREER<span className="text-discord-blurple">GRID</span>
            </Link>

            {/* CENTRAL NAVIGATION LINK MATRIX */}
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-300">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link>
                
                {/* Dynamic Dashboard Route based on User Role */}
                {user && (
                    user.role === 'recruiter' ? (
                        <Link to="/admin/dashboard" className="hover:text-white transition-colors text-discord-blurple">Recruiter Panel</Link>
                    ) : (
                        <Link to="/dashboard" className="hover:text-white transition-colors">My Pipeline</Link>
                    )
                )}

                <Link to="/help" className="hover:text-white transition-colors">Help Center</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>

            {/* AUTHENTICATION ACTION BUTTONS */}
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* Profile Link Card */}
                        <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img 
                                src={user.profile?.profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=40"} 
                                alt="User Avatar" 
                                className="w-8 h-8 rounded-full border border-discord-blurple object-cover"
                            />
                            <span className="text-xs font-bold text-white hidden sm:block">{user.fullname}</span>
                        </Link>
                        {/* Live Logout Trigger */}
                        <button 
                            onClick={logoutHandler}
                            className="bg-white/5 border border-white/10 hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-400 text-xs font-bold px-3 py-2 rounded transition-all"
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => navigate("/login")}
                            className="text-xs font-bold text-gray-300 hover:text-white px-3 py-2 transition-colors"
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => navigate("/signup")}
                            className="bg-discord-blurple hover:bg-[#4752C4] text-white text-xs font-bold px-4 py-2 rounded transition-all shadow-md shadow-discord-blurple/10"
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;