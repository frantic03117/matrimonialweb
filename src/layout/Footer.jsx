// import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useUser } from '../pages/Account/UserContext'
import { FacebookFilled, GoogleSquareFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';

const Footer = () => {
    const { policies } = useUser();
    return (
        <>
            <div className="w-full  overflow-x-hidden relative">
                <section className='relative lg:block hidden z-10 '>
                    <div className="w-full -mb-10">
                        <div className="container ">
                            <div className="grid grid-cols-12">
                                <div className="col-span-1"></div>
                                <div className="col-span-10">
                                    <div className="w-full overflow-hidden text-center text-white bg-primary p-8 rounded-lg">
                                        <h2 className='text-xl '><span className='cursive'>Free support: </span>
                                            <div className='inline-block' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "mobile")?.description }} />
                                            &nbsp;&nbsp;|&nbsp;&nbsp; <span className='cursive'>Email: </span>
                                            <div className='inline-block' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "email")?.description }} />
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="bg-primary/20 py-20">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="lg:col-span-3 col-span-12">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className=" col-span-12">
                                        <div className="footer-widgets w-full">
                                            <div className="logimg mb-4"><img src={logo}
                                                width="90" alt="" className="img-fluid" /></div>
                                            <ul className='flex gap-4'>
                                                <li>
                                                    <Link to={policies.find(obj => obj.url == "facebook")?.description?.replace(/<\/?p>/g, "")} className="inline-block size-10 rounded-full border border-primary text-center leading-10 text-primary hover:bg-primary hover:text-white ">
                                                        <FacebookFilled />
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to={policies.find(obj => obj.url == "twitter")?.description?.replace(/<\/?p>/g, "")} className='inline-block size-10 rounded-full border border-primary text-center leading-10 text-primary hover:bg-primary hover:text-white '>
                                                        <TwitterSquareFilled />
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to={policies.find(obj => obj.url == "instagram")?.description?.replace(/<\/?p>/g, "")} className="inline-block size-10 rounded-full border border-primary text-center leading-10 text-primary hover:bg-primary hover:text-white ">
                                                        <InstagramFilled />
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to={policies.find(obj => obj.url == "email")?.description?.replace(/<\/?p>/g, "")} className="inline-block size-10 rounded-full border border-primary text-center leading-10 text-primary hover:bg-primary hover:text-white ">
                                                        <GoogleSquareFilled />
                                                    </Link>

                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" lg:col-span-9 col-span-12 mr-top-footer">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="lg:col-span-3 col-span-12">
                                        <div className="footer-widget">
                                            <h4 className="widget-title cursive text-2xl  font-bold text-primary">Support</h4>
                                            <ul className="list-unstyled *:py-2">
                                                <li><Link to="/login">Getting started</Link></li>

                                                <li><Link to="/contact">Help center</Link></li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 col-span-12">
                                        <div className="footer-widget">
                                            <h4 className="widget-title cursive text-2xl  font-bold text-primary">Services</h4>
                                            <ul className="list-unstyled *:py-2">
                                                {/* <li><Link to="/plans">Pricing</Link></li> */}
                                                <li><Link to="/contact">Support</Link></li>

                                                <li><Link to="/faqs">Faq’s</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 col-span-12">
                                        <div className="footer-widget">
                                            <h4 className="widget-title cursive text-2xl  font-bold text-primary">Policy</h4>
                                            <ul className="list-unstyled *:py-2">
                                                <li><Link to="/policy/diclaimer">Disclaimer</Link></li>
                                                <li><Link to="/policy/privacy-policy">Privacy Policy</Link></li>
                                                <li><Link to="/policy/terms-conditions">Terms &amp; Conditions</Link></li>
                                                <li><Link to="/policy/refunds-cancellations"> Cancellation of Profile</Link></li>
                                                <li><Link to="/policy/delete-policy">Delete Policy</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 col-span-12">
                                        <div className="footer-widget">
                                            <h4 className="widget-title cursive text-2xl  font-bold text-primary">Contact Us</h4>
                                            <div className="footer-widget-contact">
                                                <ul className="list-unstyled *:py-2">
                                                    <li>
                                                        <div className='inline-block font-light text-sm' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "address")?.description }} />
                                                    </li>
                                                    <li>
                                                        <div className='inline-block font-light text-sm' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "mobile")?.description }} />
                                                    </li>
                                                    <li>
                                                        <div className='inline-block font-light text-sm' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "email")?.description }} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 border-t border-primary pb-4">
                                <div className="footer-text">
                                    <p className='text-sm pt-5 font-light tracking-widest leading-6'><span className="font-bold text-dark">Disclaimer</span> :
                                        <div className='inline-block *:pb-5  font-light' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "diclaimer")?.description }} />
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </footer>
                <div className="tiny-footer bg-primary text-white">
                    <div className="grid grid-cols-12 align-items-center">
                        <div className="col-span-12 mb-0 text-center p-3 text-xs">Copyright © <span id="yearText">{new Date().getFullYear()} </span>
                            <strong>Surajmal</strong> Web & App All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer