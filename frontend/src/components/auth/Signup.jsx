import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            // Providing a fallback in case the error object is empty
            alert(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className='relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden'>
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none select-none'>
                <h1 className='text-[18vw] font-black text-white/[0.02] uppercase tracking-tighter'>
                    CREATE
                </h1>
            </div>

            <div className='relative z-10 w-full max-w-md bg-discord-dark p-8 rounded-lg shadow-2xl border border-white/5 my-10'>
                <div className='text-center mb-6'>
                    <h1 className='font-bold text-2xl text-white'>Create an account</h1>
                    <p className='text-gray-400 text-sm'>Join the community today!</p>
                </div>

                {/* Added onSubmit here */}
                <form onSubmit={submitHandler} className='space-y-4'>
                    <div>
                        <label className='text-xs font-bold uppercase text-gray-400'>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className='w-full bg-discord-black p-2 mt-2 rounded border border-transparent focus:border-discord-blurple outline-none transition-all'
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className='text-xs font-bold uppercase text-gray-400'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className='w-full bg-discord-black p-2 mt-2 rounded border border-transparent focus:border-discord-blurple outline-none transition-all'
                            placeholder="name@example.com"
                        />
                    </div>

                    <div>
                        <label className='text-xs font-bold uppercase text-gray-400'>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className='w-full bg-discord-black p-2 mt-2 rounded border border-transparent focus:border-discord-blurple outline-none transition-all'
                            placeholder="1234567890"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <label className='text-xs font-bold uppercase text-gray-400'>Role</label>
                            <select 
                                name="role" 
                                value={input.role} 
                                onChange={changeEventHandler}
                                className='w-full bg-discord-black p-2 mt-2 rounded border border-transparent outline-none cursor-pointer'
                            >
                                <option value="">Select</option>
                                <option value="student">Student</option>
                                <option value="recruiter">Recruiter</option>
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label className='text-xs font-bold uppercase text-gray-400'>Profile Pic</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className='w-full text-xs text-gray-400 mt-3 cursor-pointer'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='text-xs font-bold uppercase text-gray-400'>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className='w-full bg-discord-black p-2 mt-2 rounded border border-transparent focus:border-discord-blurple outline-none transition-all'
                        />
                    </div>

                    <button type="submit" className='w-full bg-discord-blurple hover:bg-[#4752C4] text-white font-bold py-3 mt-4 rounded transition-all shadow-lg'>
                        Continue
                    </button>

                    <p className='text-sm text-gray-400 mt-4'>
                        Already have an account? <Link to="/login" className='text-discord-blurple hover:underline'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup