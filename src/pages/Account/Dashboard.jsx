// import React from 'react'
import React from 'react';
// import profile1 from '../../assets/profile/men1.jpg';
import { API_URL, usertoken } from '../../utils';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useUser } from './UserContext';

const Dashboard = () => {
    const { user, loading } = useUser();
    // const navigate = useNavigate();
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

                        <section className=' h-full lg:px-10 p-0'>
                            <div className="container">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 ">
                                        <div className="w-full text-white rounded-lg lg:p-5 p-2 bg-primary">
                                            Welcome back, <span className="cursive underline tracking-widest font-semibold">{user?.name + " " + user?.last_name}</span>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 col-span-6 ">
                                        <div className="w-full h-full bg-white border text-center border-primary/30 shadow-lg shadow-primary/50 rounded-xl lg:p-5 p-2">
                                            <label htmlFor="" className=' h-12 block text-primary font-semibold cursive tracking-widest uppercase text-sm'>Profile Completion</label>

                                            <div className=" profile_completion cursive flex items-start justify-center">
                                                {((user?.filledFieldsCount / (user?.totalColumns ?? 1)) * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 col-span-6 ">
                                        <div className="w-full h-full bg-white border text-center border-primary/30 shadow-lg shadow-primary/50 rounded-xl lg:p-5 p-2">
                                            <label htmlFor="" className=' h-12 block text-primary font-semibold cursive tracking-widest uppercase text-sm'> Interests Sent</label>
                                            <div className=" profile_completion cursive flex items-start justify-center">{user?.sent_interest}</div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 col-span-6 ">
                                        <div className="w-full h-full bg-white border text-center border-primary/30 shadow-lg shadow-primary/50 rounded-xl lg:p-5 p-2">
                                            <label htmlFor="" className=' h-12 block text-primary font-semibold cursive tracking-widest uppercase text-sm'> Interests Received</label>
                                            <div className=" profile_completion cursive flex items-start justify-center">{user?.received_interest}</div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-3 col-span-6 ">
                                        <div className="w-full h-full bg-white border text-center border-primary/30 shadow-lg shadow-primary/50 rounded-xl lg:p-5 p-2">
                                            <label htmlFor="" className=' h-12 block text-primary font-semibold cursive tracking-widest uppercase text-sm'>Profile Views</label>
                                            <div className=" profile_completion cursive flex items-start justify-center">{user?.views}</div>
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