import React from 'react'
import UserBox from './UserBox'
import axios from 'axios';
import { API_URL, usertoken } from '../../utils';
import Loading from '../../components/Loading';
// import { useUser } from './UserContext';
import { toast } from 'react-toastify';
import { FilterFilled } from '@ant-design/icons';
import { IoRefresh, IoRefreshCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const FindUsers = () => {
    // const { user } = useUser();
    const [users, setUsers] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const token = localStorage.getItem(usertoken);
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [selectedState, setSelectedState] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState('');
    const [pagination, setPagination] = React.useState({
        "totalDocs": 6,
        "totalPage": 1,
        "perPage": 10,
        "page": "1"
    });
    const [page, setPage] = React.useState(1);
    const getstates = async () => {
        const items = await axios.get(API_URL + "surajmal/core-values?key=state");
        setStates(items.data.data);
    }

    const getcities = async () => {
        if (selectedState) {
            const items = await axios.get(API_URL + "surajmal/core-values?key=city&parent_id=" + selectedState);
            setCities(items.data.data);
        }
    }
    React.useEffect(() => {
        getcities();
        setSelectedCity('');
    }, [selectedState])

    const getusers = async () => {
        try {
            setLoad(true);
            const resp = await axios.get(API_URL + `user/all?page=${page}&state=${selectedState}&city=${selectedCity}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setUsers(resp.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false);
        }
    }
    const filterdata = () => {
        getusers();
    }
    const handleWishlist = async (id) => {

        try {
            setLoad(true);
            const resp = await axios.post(API_URL + "user/wishlist", { user_id: id, type: "Favourite" }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            if (resp.data.success == "1") {
                toast.success('Updated successfully')
            }
            getusers();
        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false);
        }
    }
    const sendInsterest = async (id) => {
        try {
            setLoad(true);
            const resp = await axios.post(API_URL + "user/connection", { user_id: id }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            if (resp.data.success == "1") {
                toast.success('Updated successfully')
            }
            getusers();
        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false);
        }
    }
    React.useEffect(() => {
        getstates();
        getusers();
    }, []);
    return (
        <>
            <section className='relative'>
                {
                    load && (
                        <>
                            <Loading height={'h-[100vh]'} />
                        </>
                    )
                }
                <div className="container !p-0">
                    <div className="w-full mb-5">
                        <div className="grid grid-cols-12 gap-4">

                            <div className="lg:col-span-2 col-span-4">
                                <label htmlFor="">Select State</label>
                                <select onChange={(e) => setSelectedState(e.target.value)} className="form-control text-xs">
                                    <option value="">All</option>
                                    {
                                        states.map(itm => (
                                            <>
                                                <option selected={itm._id == selectedState} value={itm._id} >{itm.title}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="lg:col-span-2 col-span-4">
                                <label htmlFor="">Select City</label>
                                <select onChange={(e) => setSelectedCity(e.target.value)} className="form-control">
                                    <option value="">All</option>
                                    {
                                        cities.map(itm => (
                                            <>
                                                <option selected={itm._id == selectedCity} value={itm._id} >{itm.title}</option>
                                            </>
                                        ))
                                    }

                                </select>
                            </div>
                            <div className="lg:col-span-2 col-span-4 hidden">
                                <label htmlFor="">Status</label>
                                <select name="" id="" className="form-control">
                                    <option value="">All</option>
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                </select>
                            </div>
                            <div className="col-span-4">
                                <div className="w-full mt-7">
                                    <button onClick={filterdata} className='text-lg'>
                                        <FilterFilled />
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 lg:gap-5">
                        {
                            users.map((usr) => (
                                <>
                                    {
                                        (usr.name && !usr.interest) && (
                                            <>
                                                <div className="lg:col-span-10 col-span-12 mb-6">
                                                    <UserBox handleWishlist={handleWishlist} sendInsterest={sendInsterest} userdata={usr} />
                                                </div>
                                            </>
                                        )
                                    }


                                </>
                            ))
                        }
                        <div className="col-span-12">
                            {
                                users.length == 0 && (
                                    <>
                                        <div className="p-4 bg-primary/20 text-primary">
                                            No user found
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FindUsers
