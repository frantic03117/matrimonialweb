// import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useUser } from '../pages/Account/UserContext'

const Footer = () => {
    const { policies } = useUser();
    return (
        <>
            <section className='relative z-10 '>
                <div className="w-full -mb-10">
                    <div className="container ">
                        <div className="grid grid-cols-12">
                            <div className="col-span-1"></div>
                            <div className="col-span-10">
                                <div className="w-full text-center text-white bg-primary p-8 rounded-lg">
                                    <h2 className='text-xl'><span>Free support: </span>
                                        <div className='inline-block' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "mobile")?.description }} />
                                        &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email: </span>
                                        <div className='inline-block' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "email")?.description }} />
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="space bg-blue-gray-100 py-20">
                <div className="container">
                    <div className="grid grid-cols-12 gap-4">
                        <div className=" col-span-3">
                            <div className="grid grid-cols-12 gap-4">
                                <div className=" col-span-12">
                                    <div className="footer-widgets">
                                        <div className="logimg mb-4"><img src={logo}
                                            width="90" alt="" className="img-fluid" /></div>
                                        <p className="footer-text text-md tracking-wider font-light">Connecting people with precision and care. We strive to build
                                            meaningful relationships through trust and dedication, ensuring a seamless and
                                            fulfilling experience.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-span-9 mr-top-footer">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-3">
                                    <div className="footer-widget">
                                        <h4 className="widget-title">Support</h4>
                                        <ul className="list-unstyled *:py-2">
                                            <li><Link to="/login">Getting started</Link></li>
                                            <li><Link to="javascript:">Chat our support</Link></li>
                                            <li><Link to="/contact">Help center</Link></li>
                                            <li><Link to="/contact">Report a bug</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="lg:col-span-3 col-span-12">
                                    <div className="footer-widget">
                                        <h4 className="widget-title">Services</h4>
                                        <ul className="list-unstyled *:py-2">
                                            <li><Link to="/plans">Pricing</Link></li>
                                            <li><Link to="/contact">Support</Link></li>
                                            <li><Link to="javascript:">Sales and Refunds</Link></li>
                                            <li><Link to="javascript:">Legal</Link></li>
                                            <li><Link to="javascript:">Testimonials &amp; Faq’s</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="footer-widget">
                                        <h4 className="widget-title">Policy</h4>
                                        <ul className="list-unstyled *:py-2">
                                            <li><Link to="/policy/privacy-policy">Privacy Policy</Link></li>
                                            <li><Link to="/policy/terms-conditions">Terms &amp; Conditions</Link></li>
                                            <li><Link to="/policy/refunds-cancellations"> Refunds &amp; Cancellations</Link></li>
                                            <li><Link to="/policy/delete-policy"> Delete Policy</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="footer-widget">
                                        <h4 className="widget-title">Contact Us</h4>
                                        <div className="footer-widget-contact">
                                            <ul className="list-unstyled *:py-2">
                                                <li>
                                                    <div className='inline-block font-light' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "address")?.description }} />
                                                </li>
                                                <li>
                                                    <div className='inline-block font-light' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "mobile")?.description }} />
                                                </li>
                                                <li>
                                                    <div className='inline-block font-light' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "email")?.description }} />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="footer-text">
                                <p className='text-sm  font-light tracking-widest leading-6'><span className="font-bold text-dark">Disclaimer</span> :
                                    <div className='inline-block font-light' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "diclaimer")?.description }} />
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
            <div className="tiny-footer bg-black text-white">
                <div className="grid grid-cols-12 align-items-center">
                    <div className="col-span-12 mb-0 text-center p-3 text-xs">Copyright © <span id="yearText">{new Date().getFullYear()} </span>
                        <strong>Surajmal</strong> Web & App All rights reserved.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer