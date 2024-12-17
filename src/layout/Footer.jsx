// import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Footer = () => {

    return (
        <>
            <section className='relative top-9'>
                <div className="w-full">
                    <div className="container">
                        <div className="grid grid-cols-12">
                            <div className="col-span-1"></div>
                            <div className="col-span-10">
                                <div className="w-full text-center text-white bg-primary p-8 rounded-lg">
                                    <h2 className='text-xl'><span>Free support:</span> +92 (8800) 68 - 8960 &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email:</span>
                                        info@example.com</h2>
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
                                        <ul className="list-unstyled icons-listing mb-0 widget-listing">
                                            <li><Link to="javascript:">Getting started</Link></li>
                                            <li><Link to="javascript:">Chat our support</Link></li>
                                            <li><Link to="javascript:">Help center</Link></li>
                                            <li><Link to="javascript:">Services status</Link></li>
                                            <li><Link to="javascript:">Report a bug</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="lg:col-span-3 col-span-12">
                                    <div className="footer-widget">
                                        <h4 className="widget-title">Services</h4>
                                        <ul className="list-none icons-listing mb-0 widget-listing">
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
                                        <ul className="list-unstyled icons-listing mb-0 widget-listing">
                                            <li><Link to="/policy/privacy-policy">Privacy Policy</Link></li>
                                            <li><Link to="/policy/terms-conditions">Terms &amp; Conditions</Link></li>
                                            <li><Link to="/policy/refund-cancellation"> Refunds &amp; Cancellations</Link></li>
                                            <li><Link to="/policy/delete-policy"> Delete Policy</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="footer-widget">
                                        <h4 className="widget-title">Contact Us</h4>
                                        <div className="footer-widget-contact">
                                            <ul className="list-unstyled">
                                                <li>
                                                    <p>
                                                        Surajmal Memorial Education Society, C-4, Janakpuri, New Delhi-110058
                                                    </p>
                                                </li>
                                                <li>
                                                    <div><i className="bi bi-phone"></i></div>
                                                    <div><Link to="tel:+1234567899">011-45656183</Link></div>
                                                </li>
                                                <li>
                                                    <div><i className="bi bi-envelope"></i></div>
                                                    <div><Link
                                                        to="mailto:matrimonysmes@msijanakpuri.com">matrimonysmes@msijan.com</Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="footer-text">
                                <p className='text-sm  font-light tracking-widest leading-6'><span className="font-bold text-dark">Disclaimer</span> : It has come to our attention that
                                    fraudulent
                                    activities have been discovered involving individuals pretending to be employees or authorized
                                    representatives of Suraj Sujan Matrimony to defraud our customers. Please note that the only
                                    legitimate domain name for Suraj Sujan Matrimony is www.surajsujanmatrimony.in. We urge you to
                                    verify any matrimonial opportunities related to Suraj Sujan Matrimony by reaching out to us
                                    through the contact details provided below. We also request that you do not respond with any
                                    personal information if you are uncertain about the communication and refrain from sending any
                                    money to third parties until you have verified the information with us. For any inquiries or to
                                    report suspicious behavior, please contact us at support@surajsujanmatrimony.in.</p>
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