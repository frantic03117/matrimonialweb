// import React from 'react'

import Slider from "react-slick/lib/slider";
import one from '../../assets/profile/1.jpg';
import two from '../../assets/profile/2.jpg';
import three from '../../assets/profile/3.jpg';
import { NextArrow, PrevArrow } from "../../components/Arrows";
import PropTypes from "prop-types";

const Testimonials = ({bg, pb}) => {
    const tsettings = {
        arrows: true,
        dots: true, // Display navigation dots
        infinite: true, // Loop slides indefinitely
        speed: 1000, // Transition speed in ms (1 second)
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow className={'size-10 block bg-primary'} />, 
        prevArrow: <PrevArrow className={'size-10 block bg-primary'} /> ,
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
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplaySpeed: 3000, // Faster autoplay on smaller devices
                    speed: 1000, // Standard fade speed
                    dots: false, // Hide navigation dots for a cleaner look on small screens
                },
            },
            {
                breakpoint: 480, // For devices <= 480px width
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplaySpeed: 2500, // Faster autoplay for better engagement
                    dots: false, // Hide dots on very small screens
                    speed: 800, // Even faster transition speed
                },
            },
        ],
    };

    return (
        <>
            <section className={`pt-20  ${pb} ${bg}`}>
                <div className="container">
                    <div className="w-full  text-center">
                        <h2 className="section_title">Trust by  1500+ Couples</h2>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <Slider  {...tsettings}>
                                {
                                    [one, two, three].map(itm => (
                                        <>
                                            <div className="w-full testimonial ">
                                                <div className="w-full  px-6">

                                                    <img src={itm} alt="" className=" profileTesti size-[130px] block " />

                                                    <div className="w-full border bg-white rounded-lg relative px-5 pt-16 pb-10  border-primary/50">


                                                        <p className="">
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora omnis commodi deserunt sunt voluptate expedita error voluptates incidunt atque tenetur.
                                                        </p>
                                                        <div className="w-full mt-5">
                                                            <h4 className="cursive">Jack Denial</h4>
                                                            <p className="font-light">New York</p>
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