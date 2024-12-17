// import React from 'react'

const QuickAccess = ({ image, icon, title }) => {
    return (
        <>
            <div className="w-full  quick_access">
                <img src={image} alt="" className="absolute top-0 z-10 start-0 w-full h-full object-cover" />
                <div className="w-full flex items-center h-full relative z-20 ">
                    <div className="w-full parentqa group transition-all ">
                        <div className="w-full mb-4  *:transition-all">
                            <img src={icon} alt="" className="mx-auto invert-[100] group-hover:scale-[0.7]  transition-all  size-28" />
                        </div>
                        <div className="w-full  *:transition-all *:mb-4 mb-4 text-center text-white">
                            <h2 className="cursive  text-xl font-bold">{title}</h2>
                            <p>1200+ Profiles</p>
                        </div>
                        <div className="w-full *:transition-all flex justify-center">
                            <button className="border viewquick border-white px-2 w-40 py-3 text-white">
                                View All
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-primary absolute bottom-0  end-0 z-20 rounded-t-[3rem] overlaybg w-full h-[250px]">

                </div>
            </div>
        </>
    )
}

export default QuickAccess