import { CreditCardOutlined, DashboardOutlined, DeleteOutlined, EditOutlined, HeartOutlined, LogoutOutlined, MessageOutlined,  UsergroupAddOutlined } from '@ant-design/icons'
import React from 'react'
import { FaRegHandshake } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';


import { useUser } from './UserContext';
import { BASE_URL } from '../../utils';
import { GiFlowerPot } from 'react-icons/gi';

const Sidebar = () => {
    const navigate = useNavigate();
    const { user,  userLogout } = useUser();
    const [profileImage, setProfileImage] = React.useState(null);
    const [currenturl, setCurrentUrl] = React.useState('/dashboard');
    const location = useLocation();
    React.useEffect(() => {
        setCurrentUrl(location.pathname)
    }, [location.pathname])
    React.useEffect(() => {
        if (user && user.profile_image) {
            setProfileImage(BASE_URL + user.profile_image); // Use user profile image
        } else {
            setProfileImage('https://via.placeholder.com/150'); // Fallback image
        }
    }, [user]);
  
   
    const handleLogout = async () => {
        await userLogout();
        navigate('/')
    }
    return (
        <>
            <div className="w-full">
                <div className="w-full p-5 bg-white shadow-md shadow-gray-600 rounded-3xl ">
                    <figure className="w-full mb-10">
                        <label htmlFor="profileImage" className='relative size-[150px] mx-auto  block'>
                            <span className='absolute size-10 rounded-full bg-white text-center leading-10 bottom-[40px] -end-5'>
                                <EditOutlined />
                            </span>
                            <span className='absolute size-10 rounded-full bg-white text-center leading-10 bottom-[-5px] -end-3' >
                                <DeleteOutlined/>
                            </span>
                            <img src={profileImage} alt="" className=" mx-auto size-[150px]  object-cover overflow-hidden rounded-xl" />
                            <input type="file" name="" id="profileImage" className="hidden"   />
                        </label>

                    </figure>
                    <ul className='*:py-1 '>
                        <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "/user/dashboard" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/user/dashboard'} >
                                <DashboardOutlined /> <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "/user/profile" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/user/profile'} >
                                <UsergroupAddOutlined /> <span>My Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "/users" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/users'} >
                                <FaRegHandshake /> <span>Browse Profiles</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "/proposals/sent" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/proposals/sent'} >
                                <HeartOutlined /> <span>Sent Interests</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "/proposals/received" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/proposals/received'} >
                                <GiFlowerPot /> <span>Received Interests</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "/subscriptions" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/subscriptions'} >
                                <CreditCardOutlined /> <span>Donation Plan</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "/chat" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/chat'} >
                                <MessageOutlined /> <span>Chat</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/user/dashboard'} >
                                <SettingOutlined /> <span>Setting</span>
                            </Link>
                        </li> */}
                        <li>
                            <button className='flex  gap-4 items-center p-2' onClick={handleLogout}>
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