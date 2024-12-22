// import React from 'react'
import Slider from "react-slick";
// import banner1 from '../../assets/banner1.jpg';
// import banner2 from '../../assets/banner2.jpg';
import google from '../../assets/google.png';
import one from '../../assets/1.jpg';
import hall from '../../assets/hall.png'
import two from '../../assets/2.jpg';
import couple from '../../assets/couple.png';
import icon3 from '../../assets/cake.png';
import icon4 from '../../assets/gate.png'
import three from '../../assets/3.jpg';
import four from '../../assets/4.jpg';
import QuickAccess from "./QuickAccess";
import Testimonials from "./Testimonials";
import WhyUs from "./WhyUs";
import HowItWorks from "./HowItWorks";
import ContactForm from './ContactForm';
import { useUser } from '../Account/UserContext';
import { BASE_URL } from '../../utils';
import { Link } from "react-router-dom";
const Home = () => {
  const {banners} = useUser();
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
  };
  return (
    <>
      <section className="overflow-hidden relative">
        <div className="w-full" id="hero_banner" >
          <Slider {...settings}>
            {
              banners.map(bnr => (
                <>
                  <div className="w-full">
              <img src={BASE_URL + bnr.image} alt="" className="w-full" />
            </div>
                </>
              ))
            }
          
          
          </Slider>
        </div>
        <div className="w-full flex items-center justify-center bg-black/50 hero_form absolute top-0 z-50 start-0 h-full">
          <div className="container w-full">
            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-5">
                <ContactForm />
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-6">
                <div className="w-full text-white">
                  <h2 className="cursive text-[3rem] mb-5 font-bold">
                    Find your perfect soul Mate!
                  </h2>
                  <p className="mb-10 hero_p">
                    While perfection is an unattainable ideal, in this imagined partnership, we would complement each other in a beautifully imperfect harmony, bound by the threads of mutual respect, admiration, and love.
                  </p>
                  <div className="w-full flex gap-4 mt-5">
                    <button className=" w-40 border border-white btn rounded p-3 bg-white">
                      <img src={google} alt="" className="w-full" />
                    </button>
                    <Link to={'/login'} className="w-40 py-3 bg-primary text-white rounded btn">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-[3rem]">
        <div className="container">
          <div className="w-full mb-10 text-center">
            <h2 className="section_title">
              Quick Access
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <QuickAccess image={one} icon={hall} title={'Easy Signup'} />
            </div>
            <div className="col-span-3">
              <QuickAccess image={two} icon={couple} title={'Browse Profiles'} />
            </div>
            <div className="col-span-3">
              <QuickAccess image={three} icon={icon3} title={'Blog & Articles'} />
            </div>
            <div className="col-span-3">
              <QuickAccess image={four} icon={icon4} title={'Success Stories'} />
            </div>

          </div>
        </div>
      </section>
      <Testimonials pb={'pb-[16rem]'} bg="bg-primary/10" />
      <WhyUs />
      <HowItWorks />
    </>
  )
}

export default Home