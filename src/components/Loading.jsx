// import React from 'react'
import load1 from '../assets/loader/1.png';
import load2 from '../assets/loader/2.png';
import load3 from '../assets/loader/3.png';
const Loading = ({ height = null }) => {
    return (
        <>
            <section className={`absolute bg-white/60 backdrop-blur-sm w-full ${height}    top-0 end-0 z-50`}>
                <div className="container h-full">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="inline-flex gap-4 items-center">
                            <img src={load1} className='w-20 animate-pulse' alt="" />
                            <img src={load3} className='size-6 animate-ping' alt="" />
                            <img src={load2} className='w-10 animate-bounce' alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Loading