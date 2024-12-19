// import React from 'react'
import React from 'react';
import profile1 from '../../assets/profile/men1.jpg';
import { API_URL, usertoken } from '../../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useUser } from './UserContext';

const Dashboard = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();
    const [connections, setConnections] = React.useState({});
    const utoken = localStorage.getItem(usertoken);
    const [isload, setLoading] = React.useState(true);
    const getconnections = async () => {
        try {
            setLoading(true);
            const connects = await axios.get(API_URL + "user/connection?status=pending&type=received", {
                headers: {
                    Authorization: "Bearer " + utoken
                }
            });

            setConnections(connects.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        getconnections();
    }, []);
    return (
        <>
            {
                (loading || isload) ? (
                    <>
                        <div className="w-full flex items-center h-screen">
                            <Loading />
                        </div>
                    </>
                ) : (
                    <>

                        <section className=' h-full px-10'>
                            <div className="container">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 ">
                                        <div className="w-full text-white rounded-lg p-5 bg-primary">
                                            Welcome back, {user?.name + " " + user?.last_name}
                                        </div>
                                    </div>
                                    <div className="col-span-3 ">
                                        <div className="w-full h-full bg-white border text-center border-primary/30 shadow-lg shadow-primary/50 rounded-xl p-5">
                                            <label htmlFor="">Profile Completion</label>

                                            <div className="size-24 profile_completion mx-auto  font-bold  leading-[4] text-center text-white text-xl">
                                                {((user?.filledFieldsCount / (user?.totalColumns ?? 1)) * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 ">
                                        <div className="w-full h-full bg-white border text-center border-primary/30 shadow-lg shadow-primary/50 rounded-xl p-5">
                                            <label htmlFor=""> Interests Sent</label>
                                            <div className="size-24 profile_completion mx-auto  font-bold  leading-[4] text-center text-white text-xl">{user?.sent_interest}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 ">
                                        <div className="w-full h-full bg-white border text-center border-primary/30 shadow-lg shadow-primary/50 rounded-xl p-5">
                                            <label htmlFor=""> Interests Received</label>
                                            <div className="size-24 profile_completion mx-auto  font-bold  leading-[4] text-center text-white text-xl">{user?.received_interest}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 ">
                                        <div className="w-full h-full bg-white border text-center border-primary/30 shadow-lg shadow-primary/50 rounded-xl p-5">
                                            <label htmlFor="">Profile Views</label>
                                            <div className="size-24 profile_completion mx-auto  font-bold  leading-[4] text-center text-white text-xl">{user?.views}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 mt-5">
                                    <div className="col-span-12 hidden">
                                        <div className="flex gap-4">
                                            <button className='bg-primary text-white p-3 rounded'>
                                                New Requests <small>({connections?.length})</small>
                                            </button>
                                            <button>
                                                Accepted Requests
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        connections.map(() => (
                                            <>

                                                <div className="col-span-12 my-2">
                                                    <div className="w-full p-5 rounded-xl shadow-sm shadow-gray-600 bg-white">


                                                        <div className="grid grid-cols-12 gap-4">
                                                            <div className="col-span-2">
                                                                <img src={profile1} alt="" className=" size-32 rounded-xl" />
                                                            </div>

                                                            <div className="col-span-10">
                                                                <div className="w-full">
                                                                    <h4 className='text-primary text-lg font-bold'>John Smith</h4>
                                                                    <ul className='list-disc font-light flex gap-5 list-inside text-primary'>
                                                                        <li>
                                                                            <strong>City </strong> <span>Gurgaon</span>
                                                                        </li>
                                                                        <li>
                                                                            <strong>Age </strong> <span>25 years</span>
                                                                        </li>
                                                                        <li>
                                                                            <strong>Height </strong> <span>5.9</span>
                                                                        </li>
                                                                        <li>
                                                                            <strong>Job </strong> <span>Govt. Job</span>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="w-full py-3 text-end">
                                                                        <button className='text-green-500 border border-green-500 px-5 py-2 rounded text-xs'>Accept</button>
                                                                        <button className='text-red-500 border ms-3 border-red-500 px-5 py-2 rounded text-xs'>Reject</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default Dashboard