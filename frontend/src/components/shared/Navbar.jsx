import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const currentUser = user || JSON.parse(localStorage.getItem("user"));

    const logoutHandler = async () => {
        try {
            await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        } catch (e) { }
        dispatch(setUser(null));
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-discord-dark/90 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between z-50">
            <Link to="/" className="text-xl font-black tracking-wider text-white hover:text-discord-blurple transition-colors">
                CAREER<span className="text-discord-blurple">GRID</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-300">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link>
                {currentUser && (
                    currentUser.role === 'recruiter' ? (
                        <Link to="/admin/dashboard" className="hover:text-white transition-colors text-discord-blurple">Recruiter Panel</Link>
                    ) : (
                        <Link to="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link>
                    )
                )}
                <Link to="/help" className="hover:text-white transition-colors">Help Center</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>

            <div className="flex items-center gap-4">
                {currentUser ? (
                    <div className="flex items-center gap-4">
                        <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img
                                src={currentUser.profile?.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullname)}&background=5865F2&color=fff`}
                                alt="Avatar"
                                className="w-8 h-8 rounded-full border border-discord-blurple object-cover"
                            />
                            <span className="text-xs font-bold text-white hidden sm:block">{currentUser.fullname}</span>
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="bg-white/5 border border-white/10 hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-400 text-xs font-bold px-3 py-2 rounded transition-all"
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate("/login")} className="text-xs font-bold text-gray-300 hover:text-white px-3 py-2 transition-colors">
                            Sign In
                        </button>
                        <button onClick={() => navigate("/signup")} className="bg-discord-blurple hover:bg-[#4752C4] text-white text-xs font-bold px-4 py-2 rounded transition-all shadow-md">
                            Register
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;