// import React from 'react'
import icon1 from '../../assets/prize.png';
import icon2 from '../../assets/trust.png';
import icon3 from '../../assets/rings.png';
import icon4 from '../../assets/experience.png';
const WhyUs = () => {
    return (
        <>
            <section className="py-20 whyUs bg-primary relative">
                <div className="container pt-10 ">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 text-center text-white">
                            <h2 className="section_title">Why choose us</h2>
                            <p>
                                Most Trusted and premium Matrimony Service in the World.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='pb-20 bg-primary/10 relative -mt-14'>
                <div className="container">
                    <div className="grid grid-cols-12 gap-6">

                        <div className="lg:col-span-3 col-span-6">
                            <div className="w-full text-center shadow-sm shadow-primary/40 h-full bg-white rounded-lg border border-primary/20 md:p-5 p-3">
                                <div className="icon  md:size-20 size-10 mx-auto">
                                    <img src={icon1} className='w-full' alt="icon1" />
                                </div>
                                <h4 className="text-red-800 py-3 font-semibold cursive lg:text-sm text-xs">Genuine Profiles</h4>
                                <p className="font-light tracking-wider lg:text-sm text-xs">
                                    Contact genuine profiles with 100% verified mobile.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-3 col-span-6">
                            <div className="w-full text-center shadow-sm shadow-primary/40 h-full bg-white rounded-lg border border-primary/20  md:p-5 p-3">
                                <div className="icon md:size-20 size-10 mx-auto">
                                    <img src={icon2} className='w-full' alt="icon1" />
                                </div>
                                <h4 className="text-red-800 py-3 font-semibold cursive lg:text-sm text-xs">Most Trusted</h4>
                                <p className="font-light tracking-wider lg:text-sm text-xs">
                                    The most trusted  profile across india wedding matrimony brand.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-3 col-span-6">
                            <div className="w-full text-center shadow-sm shadow-primary/40 h-full bg-white rounded-lg border border-primary/20  md:p-5 p-3">
                                <div className="icon md:size-20 size-10 mx-auto">
                                    <img src={icon3} className='w-full' alt="icon1" />
                                </div>
                                <h4 className="text-red-800 py-3 font-semibold cursive lg:text-sm text-xs">2000+ Weddings</h4>
                                <p className="font-light tracking-wider lg:text-sm text-xs">
                                    Lakhs of peoples have found their life partner
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-3 col-span-6">
                            <div className="w-full text-center shadow-sm shadow-primary/40 h-full bg-white rounded-lg border border-primary/20  md:p-5 p-3">
                                <div className="icon md:size-20 size-10 mx-auto">
                                    <img src={icon4} className='w-full' alt="icon1" />
                                </div>
                                <h4 className="text-red-800 py-3 font-semibold cursive lg:text-sm text-xs">20+ Years</h4>
                                <p className="font-light tracking-wider lg:text-sm text-xs">
                                    20+ years of experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhyUs