import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/authSlice'

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                if (res.data.user.role === 'recruiter') {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || "Invalid credentials, please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='relative min-h-screen overflow-hidden text-white'>
            <Navbar />
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none select-none'>
                <h1 className='text-[15vw] font-black text-white/[0.03] uppercase tracking-tighter'>IDENTIFY</h1>
            </div>
            <div className='relative z-10 flex items-center justify-center mt-20 p-4'>
                <form onSubmit={submitHandler} className='w-full max-w-md bg-discord-dark p-8 rounded-lg shadow-2xl border border-white/5'>
                    <div className='text-center mb-6'>
                        <h1 className='font-bold text-2xl text-white'>Welcome back!</h1>
                        <p className='text-gray-400 text-sm'>We're so excited to see you again!</p>
                    </div>

                    {error && (
                        <div className='bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded mb-4'>
                            {error}
                        </div>
                    )}

                    <div className='space-y-4'>
                        <div>
                            <label className='text-xs font-bold uppercase text-gray-400'>Email</label>
                            <input
                                type="email" name="email" value={input.email} onChange={changeEventHandler}
                                placeholder="name@example.com"
                                className='w-full bg-discord-black p-2 mt-2 rounded border border-transparent focus:border-discord-blurple outline-none transition-all'
                                required
                            />
                        </div>
                        <div>
                            <label className='text-xs font-bold uppercase text-gray-400'>Password</label>
                            <input
                                type="password" name="password" value={input.password} onChange={changeEventHandler}
                                className='w-full bg-discord-black p-2 mt-2 rounded border border-transparent focus:border-discord-blurple outline-none transition-all'
                                required
                            />
                        </div>
                        <div>
                            <label className='text-xs font-bold uppercase text-gray-400'>Role</label>
                            <select
                                name="role" value={input.role} onChange={changeEventHandler}
                                className='w-full bg-discord-black p-2 mt-2 rounded border border-transparent outline-none cursor-pointer'
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="recruiter">Recruiter</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-discord-blurple hover:bg-[#4752C4] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 mt-6 rounded transition-all shadow-lg'
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>

                    <p className='text-sm text-gray-400 mt-4 text-center'>
                        Need an account? <Link to="/signup" className='text-discord-blurple hover:underline'>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;