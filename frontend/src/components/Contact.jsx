import React, { useState } from 'react'
import Navbar from './shared/Navbar'

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const contactSubmitHandler = (e) => {
        e.preventDefault();
        // Hook this up to an email service or a feedback database schema collection later
        alert(`Thank you, ${form.name}! Your message has been routed to our technical support team.`);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-discord-gray text-white pt-24 px-6 mb-12 selection:bg-discord-blurple">
            <Navbar />

            <div className="max-w-xl mx-auto bg-discord-dark border border-white/5 rounded-xl p-8 shadow-2xl space-y-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Contact System Operations</h1>
                    <p className="text-gray-400 text-sm mt-1">Encountering structural errors or connection issues? Drop our global network engineers a direct message.</p>
                </div>

                <form onSubmit={contactSubmitHandler} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                        <input 
                            type="text" value={form.name} required
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your Name"
                            className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Email Address</label>
                        <input 
                            type="email" value={form.email} required
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@example.com"
                            className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Message Parameters</label>
                        <textarea 
                            value={form.message} required rows="4"
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Outline your inquiry or operational bug findings here..."
                            className="w-full bg-discord-black p-2.5 rounded border border-transparent focus:border-discord-blurple outline-none text-sm resize-none transition-all"
                        ></textarea>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-discord-blurple hover:bg-[#4752C4] text-white font-bold py-3 text-sm rounded transition-all shadow-lg shadow-discord-blurple/10"
                    >
                        Dispatch Message Vector
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Contact;