import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useUser } from '../pages/Account/UserContext'
import { UserOutlined } from '@ant-design/icons';
import { CgMenuRight } from 'react-icons/cg';
import { MobileView, isMobile } from 'react-device-detect';
import React from 'react';
const Header = () => {
    const { user } = useUser();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const location = useLocation();
    React.useEffect(() => {
        setOpen(false);
    }, [location.pathname, isMobile])
    const weblinks = () => (
        <>

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
                <Link to={'/faqs'} >Faqs</Link>
            </li>
            <li>
                <Link to={'/contact'} >Contact</Link>
            </li>
        </>
    )
    return (
        <>
            <section className='bg-yellow-100/20 relative'>
                <div className="container relative">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="flex justify-between items-center">
                                <Link to={'/'} className="w-16 py-3 inline-block">
                                    <img src={logo} className='w-full' alt="" />
                                </Link>

                                <ul className="lg:inline-flex hidden gap-5 relative start-28 navlinks mx-auto">
                                    {weblinks()}
                                </ul>

                                <ul className="inline-flex items-center ms-auto gap-5">
                                    <li>
                                        {
                                            (user?.name) ? (<>
                                                <Link to={'/user/dashboard'} className="lg:bg-primary lg:text-white px-3 py-2 rounded  text-sm  font-light uppercase btn overflow-hidden relative block">
                                                    <span className="inline-block lg:bg-white text-primary leading-8 text-center rounded-full size-8">
                                                        <UserOutlined />
                                                    </span>
                                                    <span className=''>
                                                        {user?.name} {user?.last_name}
                                                    </span>
                                                </Link>
                                            </>) : (<>
                                                <Link to={'/login'} className="lg:bg-primary lg:text-white text-primary px-3 py-2 rounded  lg:text-sm text-xl  font-light uppercase btn overflow-hidden relative block">
                                                    <span className='lg:inline hidden'>Account</span>
                                                    <span className='lg:hidden inline'>
                                                        <UserOutlined />
                                                    </span>
                                                </Link>
                                            </>)
                                        }

                                    </li>
                                    <li>
                                        <button onClick={() => handleOpen()} className='text-primary lg:hidden block text-xl'>
                                            <CgMenuRight />
                                        </button>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
                {
                    open && (
                        <>
                            <div className="relative top-0 w-full bg-primary p-5">
                                <ul className='*:text-white navlinkmobile'>
                                    {weblinks()}
                                </ul>
                            </div>

                        </>
                    )
                }

            </section>

        </>
    )
}

export default Header