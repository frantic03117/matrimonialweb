// import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const Header = () => {
    return (
        <>
            <section className='bg-yellow-100/20'>
                <div className="container">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="flex justify-between items-center">
                                <div className="w-16">
                                    <img src={logo} className='w-full' alt="" />
                                </div>
                                <ul className="inline-flex gap-5 relative start-28 navlinks mx-auto">
                                    <li>
                                        <Link to={'/'} >Home</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} >About</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} >Profiles</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'} >Contact</Link>
                                    </li>
                                </ul>

                                <ul className="inline-flex ms-auto">
                                    <li>
                                        <Link to={'/login'} className="bg-primary text-white px-3 py-2 rounded  text-sm  font-light uppercase btn overflow-hidden relative block">
                                            Account
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header