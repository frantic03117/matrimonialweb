// import React from 'react'

import Slider from "react-slick/lib/slider";
import { NextArrow, PrevArrow } from "../../components/Arrows";
import PropTypes from "prop-types";
import { useUser } from "../Account/UserContext";
import { BASE_URL } from "../../utils";

const Testimonials = ({ bg, pb }) => {
    const { testimonial } = useUser();
    const tsettings = {
        arrows: false,
        dots: true, // Display navigation dots
        infinite: true, // Loop slides indefinitely
        speed: 1000, // Transition speed in ms (1 second)
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow className={'size-10 block bg-primary'} />,
        prevArrow: <PrevArrow className={'size-10 block bg-primary'} />,
        responsive: [
            {
                breakpoint: 1024, // For devices <= 1024px width
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplaySpeed: 5000, // Slower autoplay for larger screens
                    speed: 1200, // Slower fade transition for smoother UX
                },
            },
            {
                breakpoint: 768, // For devices <= 768px width
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 3000, // Faster autoplay on smaller devices
                    speed: 1000, // Standard fade speed
                    dots: false, // Hide navigation dots for a cleaner look on small screens
                },
            },
            {
                breakpoint: 480, // For devices <= 480px width
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2500, // Faster autoplay for better engagement
                    dots: false, // Hide dots on very small screens
                    speed: 800, // Even faster transition speed
                },
            },
        ],
    };

    return (
        <>
            <section className={`pt-20 overflow-hidden max-w-[100vw] ${pb} ${bg}`}>
                <div className="container">
                    <div className="w-full hidden  text-center">
                        <h2 className="section_title">Trust by  1500+ Couples</h2>
                    </div>
                    <div className=" grid-cols-12 hidden">
                        <div className="col-span-12">
                            <Slider  {...tsettings}>
                                {
                                    testimonial.map(itm => (
                                        <>
                                            <div className="w-full testimonial ">
                                                <div className="w-full  px-6">

                                                    <img src={BASE_URL + itm.image} alt="" className=" profileTesti size-[130px] block object-cover object-top" />

                                                    <div className="w-full border bg-white rounded-lg relative px-5 pt-16 pb-10  border-primary/50">


                                                        <p className=" h-44 text-sm overflow-y-auto">
                                                            {itm.description}
                                                        </p>
                                                        <div className="w-full mt-5">
                                                            <h4 className="cursive font-bold text-primary tracking-widest">{itm.name}</h4>
                                                            <p className="font-light text-sm">{itm.location}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
Testimonials.propTypes = {
    bg: PropTypes.string,
    pb: PropTypes.string,
};

export default Testimonials