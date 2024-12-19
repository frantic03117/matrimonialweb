// import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useUser } from '../pages/Account/UserContext'
import { UserOutlined } from '@ant-design/icons';
const Header = () => {
    const { user } = useUser();
    console.log(user)
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
                                        <Link to={'/about'} >About</Link>
                                    </li>
                                    {
                                        user.name && (
                                            <>
                                                <li>
                                                    <Link to={'/users'} >Profiles</Link>
                                                </li>
                                            </>
                                        )
                                    }

                                    <li>
                                        <Link to={'/contact'} >Contact</Link>
                                    </li>
                                </ul>

                                <ul className="inline-flex ms-auto">
                                    <li>
                                        {
                                            (user?.name) ? (<>
                                                <Link to={'/user/dashboard'} className="bg-primary text-white px-3 py-2 rounded  text-sm  font-light uppercase btn overflow-hidden relative block">
                                                    <span className="inline-block bg-white text-primary leading-8 text-center rounded-full size-8">
                                                        <UserOutlined />
                                                    </span>  {user?.name} {user?.last_name}
                                                </Link>
                                            </>) : (<>
                                                <Link to={'/login'} className="bg-primary text-white px-3 py-2 rounded  text-sm  font-light uppercase btn overflow-hidden relative block">
                                                    Account
                                                </Link>
                                            </>)
                                        }

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