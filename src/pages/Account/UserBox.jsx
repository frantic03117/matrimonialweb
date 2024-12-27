import React from 'react';
import { API_URL, BASE_URL, usertoken } from '../../utils';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes

const UserBox = ({
    userdata,
    sendInsterest,
    handleWishlist,
    handleConnection = () => { },
    viewType = "all"
}) => {

    const [profileimage, setProfileImage] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (userdata?.profile_image) {
            setProfileImage(BASE_URL + userdata?.profile_image);
        } else {
            setProfileImage('https://via.placeholder.com/150');
        }
    }, [userdata]);

    const token = localStorage.getItem(usertoken);

    const chatUser = async (user_id) => {
        const resp = await axios.post(API_URL + "chat/room", { user_id }, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if (resp.data.success == "1") {
            navigate('/chat');
        }
    };

    function calculateAge(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        return age;
    }

    const convertHeight = (decimalHeight) => {
        if (decimalHeight) {
            const [feet, inches] = decimalHeight.toString().split(".").map(Number);

            // Handle case where inches might be undefined or invalid
            if (isNaN(feet) || isNaN(inches)) {
                return null;  // Return null if the conversion failed
            }

            const totalInches = Math.round((inches / 10) * 12); // Convert decimal part to inches
            return `${feet}'${totalInches}"`;
        } else {
            return null;  // Return null if decimalHeight is undefined or falsy
        }
    };


    return (
        <div className="w-full relative overflow-hidden">
            <div className="w-full p-5 rounded-xl shadow-sm border border-primary/30 shadow-gray-900 bg-white">
                <div className="grid grid-cols-12 gap-4">
                    <div className="lg:col-span-2 col-span-12">
                        <img src={profileimage} alt="" className=" size-32 rounded-xl" />
                    </div>
                    <div className="lg:col-span-10 col-span-12 relative">
                        <div className="w-full relative">
                            {
                                userdata?.favourite ? (
                                    <button onClick={() => handleWishlist(userdata?._id)} className='absolute end-4 top-0 text-red-500 opacity-[0.7]'>
                                        <HeartFilled />
                                    </button>
                                ) : (
                                    <button onClick={() => handleWishlist(userdata?._id)} className='absolute end-4 top-0 opacity-[0.7]'>
                                        <HeartOutlined />
                                    </button>
                                )
                            }

                            <h4 className='text-primary text-lg font-bold'>{userdata.name} {userdata.last_name ?? ""}</h4>
                            <ul className='list-disc font-light flex flex-wrap lg:gap-5 gap-3 list-inside text-primary'>
                                <li>
                                    <strong>City </strong> <span>{userdata.city?.title ?? "NA"}</span>
                                </li>
                                <li>
                                    <strong>Age </strong> <span>{calculateAge(userdata?.date_of_birth ?? "1990-01-01")}</span>
                                </li>
                                <li>
                                    <strong>Height </strong> <span>{convertHeight(userdata?.height)}</span>
                                </li>
                                <li>
                                    <strong>Job </strong> <span>{userdata?.occupation?.title}</span>
                                </li>
                            </ul>
                            <div className="w-full py-3 text-end">
                                {
                                    (userdata?.interest && userdata?.interest?._id) ? (
                                        <>
                                            {
                                                userdata?.interest?.status == "pending" && (
                                                    <>
                                                        {viewType == "all" && (
                                                            <span className="absolute text-center top-[-10px] end-[-43px] inline-block rotate-45 text-nowrap px-3 py-1 bg-amber-700 text-white text-xs rounded">Pending</span>
                                                        )}
                                                        {viewType == "received" && (
                                                            <>
                                                                <button onClick={() => handleConnection('accepted', userdata._id)} className='px-3 py-1 text-sm border border-green-500 text-green-500 rounded'>Accept</button>
                                                                <button onClick={() => handleConnection('rejected', userdata._id)} className='px-3 py-1 text-sm border border-red-500 text-red-500 rounded ms-2'>Decline</button>
                                                            </>
                                                        )}
                                                    </>
                                                )
                                            }
                                            {
                                                userdata?.interest?.status == "accepted" && (
                                                    <>
                                                        <Link
                                                            to="/profile"
                                                            state={{ userdata }} // Passing userdata via state
                                                            className="inline-block text-nowrap px-3 py-2 bg-primary text-white text-xs rounded"
                                                        >
                                                            View Profile
                                                        </Link>                        
                                                          <button onClick={() => chatUser(userdata._id)} className='text-green-500 border ms-2 border-green-500 px-5 py-2 rounded text-xs'>Chat</button>
                                                    </>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <button onClick={() => sendInsterest(userdata._id)} className='text-green-500 border border-green-500 px-5 py-2 rounded text-xs'>Send Interest</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add prop types validation
UserBox.propTypes = {
    userdata: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
        date_of_birth: PropTypes.string.isRequired,
        height: PropTypes.number,
        occupation: PropTypes.shape({
            title: PropTypes.string,
        }),
        profile_image: PropTypes.string,
        favourite: PropTypes.bool,
        interest: PropTypes.shape({
            _id: PropTypes.string,
            status: PropTypes.string,
        }),
    }).isRequired,
    sendInsterest: PropTypes.func.isRequired,
    handleWishlist: PropTypes.func.isRequired,
    handleConnection: PropTypes.func,
    viewType: PropTypes.string,
};

export default UserBox;
