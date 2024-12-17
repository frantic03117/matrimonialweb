import { CreditCardOutlined, DashboardOutlined, EditOutlined, HeartOutlined, LogoutOutlined, MessageOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import React from 'react'
import { FaRegHandshake } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';


import { useUser } from './UserContext';
import { BASE_URL } from '../../utils';
import { GiFlowerPot } from 'react-icons/gi';

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, loading, userLogout } = useUser();
    const [profileImage, setProfileImage] = React.useState(null);
    React.useEffect(() => {
        if (user && user.profile_image) {
            setProfileImage(BASE_URL + user.profile_image); // Use user profile image
        } else {
            setProfileImage('https://via.placeholder.com/150'); // Fallback image
        }
    }, [user]);
    const handleLogout = async () => {
        await userLogout();
    }
    return (
        <>
            <div className="w-full">
                <div className="w-full p-5 bg-white shadow-md shadow-gray-600 rounded-3xl ">
                    <figure className="w-full mb-10">
                        <label htmlFor="profileImage" className='relative size-[150px] mx-auto  block'>
                            <span className='absolute size-10 rounded-full bg-white text-center leading-10 bottom-5 -end-5'>
                                <EditOutlined />
                            </span>
                            <img src={profileImage} alt="" className=" mx-auto size-[150px]  object-cover overflow-hidden rounded-xl" />
                            <input type="file" name="" id="profileImage" className="hidden" />
                        </label>

                    </figure>
                    <ul className='*:py-2'>
                        <li>
                            <Link className='flex gap-4' to={'/user/dashboard'} >
                                <DashboardOutlined /> <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex gap-4' to={'/user/profile'} >
                                <UsergroupAddOutlined /> <span>My Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex gap-4' to={'/users'} >
                                <FaRegHandshake /> <span>Browse Profiles</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex gap-4' to={'/sent-proposals'} >
                                <HeartOutlined /> <span>Sent Interests</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex gap-4' to={'/received-proposals'} >
                                <GiFlowerPot /> <span>Received Interests</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex gap-4' to={'/subscriptions'} >
                                <CreditCardOutlined /> <span>Donation Plan</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex gap-4' to={'/chat'} >
                                <MessageOutlined /> <span>Chat</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link className='flex gap-4' to={'/user/dashboard'} >
                                <SettingOutlined /> <span>Setting</span>
                            </Link>
                        </li> */}
                        <li>
                            <button className='flex  gap-4' onClick={handleLogout}>
                                <LogoutOutlined /> <span>Logout</span>
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default Sidebar