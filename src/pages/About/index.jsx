import React from 'react'
import about1 from '../../assets/about/1.jpg'
import about2 from '../../assets/about/2.jpg'
import { useUser } from '../Account/UserContext';
import HowItWorks from '../Home/HowItWorks';
import Testimonials from '../Home/Testimonials';
const About = () => {
    const { policies } = useUser();
    return (
        <>
            <section className='lg:py-20 py-10'>
                <div className="container">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="lg:col-span-6 col-span-12">
                            <div className="w-full relative">
                                <span class="ab-wel-3"></span>
                                <img src={about1} alt="" className='ab-wel-1' />
                                <img src={about2} alt="" className='ab-wel-2' />
                            </div>
                        </div>
                        <div className="lg:col-span-6 col-span-12">
                            <div className="w-full aboutUs lg:mt-0 mt-10 ">
                                <div className='w-[calc(100%-1rem)] ab-wel-rhs *:mb-5 text-wrap block' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "about")?.description }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Testimonials bg={"bg-primary/30"} pb={'pb-10'} />
            <HowItWorks />
        </>
    )
}

export default About
