import { CreditCardOutlined, DashboardOutlined, DeleteOutlined, EditOutlined, HeartOutlined, LogoutOutlined, MessageOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import React from 'react'
import { FaRegHandshake } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';


import { useUser } from './UserContext';
import { API_URL, BASE_URL, usertoken } from '../../utils';
import { GiFlowerPot } from 'react-icons/gi';
import axios from 'axios';
import { GrGallery } from 'react-icons/gr';

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useUser();
    const [profileImage, setProfileImage] = React.useState(null);

    const token = localStorage.getItem(usertoken);
    const [currenturl, setCurrentUrl] = React.useState('/dashboard');

    const location = useLocation();
    React.useEffect(() => {
        setCurrentUrl(location.pathname)
    }, [location.pathname])
    React.useEffect(() => {
        if (user && user.profile_image) {
            setProfileImage(BASE_URL + user.profile_image);
        } else {
            setProfileImage('https://via.placeholder.com/150');
        }

    }, [user]);


    const handleLogout = async () => {
        await userLogout();
        navigate('/')
    }


    const [file, setFile] = React.useState(null);
    const [imagePreview, setImagePreview] = React.useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleedit = async (e) => {
        e.preventDefault();

        try {
            const formd = new FormData();
            formd.append("file", file);

            const itm = await axios.post(API_URL + "user/add-images", formd, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if (itm?.data?.success === 1) {
                console.log("Upload successful:", itm);
                window.location.reload();
            } else {
                console.log("Upload failed or success flag is not 1:", itm?.data?.message || "Unknown error");
            }
        } catch (err) {
            console.error("Error during upload:", err);
        } finally {
            // Any cleanup or state updates here
        }
    };

    const handledelete = async (e) => {
        e.preventDefault();
        try {
            const itm = await axios.post(API_URL + "user/remove-profile-image", null, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            setProfileImage('https://via.placeholder.com/150');

            if (itm?.data?.success === 1) {
                console.log("Upload successful:", itm);
                window.location.reload();
            }
        } catch (err) {
            console.error("Error during delete:", err);
        }
    };


    return (
        <>
            <div className="w-full">
                <div className="w-full p-5 bg-white shadow-md shadow-gray-600 rounded-3xl ">
                    <figure className="w-full mb-10">
                        {/* <label htmlFor="profileImage" className='relative size-[150px] mx-auto  block'>
                            <span className='absolute size-10 rounded-full bg-white text-center leading-10 bottom-[40px] -end-5' >
                                <EditOutlined />
                            </span>
                            <span className='absolute size-10 rounded-full bg-white text-center leading-10 bottom-[-5px] -end-3' >
                                <DeleteOutlined/>
                            </span>
                            <img src={profileImage} alt="" className=" mx-auto size-[150px]  object-cover overflow-hidden rounded-xl" />
                            <input type="file" name="" onChange={(e)=>setfile(e.target.files[0])} id="profileImage" className="hidden" accept="image/*"   />
                        </label> */}

                        <label htmlFor="profileImage" className="relative size-[150px] mx-auto block">
                            <span className="absolute size-10 rounded-full bg-white text-center leading-10 bottom-[40px] -end-5">
                                <EditOutlined />
                            </span>

                            <img
                                src={imagePreview ?? file ?? profileImage} // fallback to default image if no file selected
                                alt="Profile Preview"
                                className="mx-auto size-[150px] object-cover overflow-hidden rounded-xl"
                            />
                            <input
                                type="file"
                                onChange={handleFileChange}
                                id="profileImage"
                                className="hidden"
                                accept="image/*"
                            />
                            {file && (
                                <button onClick={handleedit} className="mt-2 px-7 py-1 bg-primary text-white rounded text-xs">
                                    Update Image
                                </button>
                            )}
                        </label>
                        <span className="absolute size-10 rounded-full bg-white text-center leading-10 right-[54px] top-[138px]" onClick={(e) => handledelete(e)}>
                            <DeleteOutlined />
                        </span>


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
                            <Link className={`flex gap-4 p-2 ${currenturl == "/gallery" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/gallery'} >
                                <GrGallery /> <span>Gallery</span>
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
                                <CreditCardOutlined /> <span>Donation</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={`flex gap-4 p-2 ${currenturl == "/chats" ? 'bg-primary/30 border-s border-primary text-primary' : ''}`} to={'/chats'} >
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