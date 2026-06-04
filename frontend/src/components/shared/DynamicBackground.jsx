import React from 'react'

const DynamicBackground = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-[#111214] text-white overflow-x-hidden">
            
            {/* FIXED BACKGROUND CANVAS */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                
                {/* Neon Blur Orb 1 - Top Left */}
                <div className="absolute top-[-25%] left-[-15%] w-[700px] h-[700px] bg-discord-blurple rounded-full blur-[160px] animate-orb-1"></div>
                
                {/* Neon Blur Orb 2 - Bottom Right */}
                <div className="absolute bottom-[-20%] right-[-15%] w-[700px] h-[700px] bg-emerald-500 rounded-full blur-[160px] animate-orb-2"></div>
                
                {/* CRISP PERSISTENT GEOMETRIC GRID */}
                <div 
                    className="absolute inset-0 opacity-[0.03]" 
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), 
                                          linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                ></div>
            </div>

            {/* FRONT APPLICATION TREE LAYER */}
            <div className="relative z-10 w-full min-h-screen flex flex-col bg-transparent">
                {children}
            </div>
        </div>
    )
}

export default DynamicBackground;