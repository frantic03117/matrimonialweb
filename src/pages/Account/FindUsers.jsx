import React from 'react'
import UserBox from './UserBox'
import axios from 'axios';
import { API_URL, usertoken } from '../../utils';
import Loading from '../../components/Loading';
// import { useUser } from './UserContext';
import { toast } from 'react-toastify';
import { FilterFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import { IoRefresh, IoRefreshCircleOutline } from 'react-icons/io5';
// import { Link } from 'react-router-dom';

const FindUsers = () => {
    // const { user } = useUser();
    const navigate = useNavigate();
    const [users, setUsers] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const token = localStorage.getItem(usertoken);
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [selectedState, setSelectedState] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState('');
    const [filters, setFilters] = React.useState({});
    const [pagination, setPagination] = React.useState({
        "totalDocs": 1,
        "totalPage": 1,
        "perPage": 1,
        "page": "1"
    });
    const [mvals, setMvals] = React.useState([]);
    const [suubscription, setsuubscription] = React.useState([])
    const [page, setPage] = React.useState(1);

    const getstates = async () => {
        const items = await axios.get(API_URL + "surajmal/core-values?key=state");
        setStates(items.data.data);

    }
    const getmvals = async () => {
        const resp = await axios.get(API_URL + "surajmal/core-values");
        setMvals(resp.data.data);
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

            const subscription = await axios.get(API_URL + `cart/user`, {
                headers: {
                    Authorization: "Bearer " + token
                },

            });

            console.log("subs", subscription.data.data)

            if (subscription.data.data && subscription.data.data.length == 0) {
                // const resp = await axios.get(API_URL + `user/all?page=${page}&state=${selectedState}&city=${selectedCity}`, {
                //     headers: {
                //         Authorization: "Bearer " + token
                //     }
                // });
                // setUsers(resp.data.data);
                // setPagination(resp.data.pagination)
                setsuubscription(subscription.data.data)
                setLoad(false);

            } else {

                const resp = await axios.get(API_URL + `user/all`, {
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    params: {
                        page: page,
                        state: selectedState,
                        city: selectedCity,
                        ...filters
                    }
                });
                setUsers(resp.data.data);
                setPagination(resp.data.pagination)
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false);
        }


    }
    const handleFilters = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }))
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
        getusers();
    }, [page])
    React.useEffect(() => {
        getstates();

        getmvals();
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
                        <div className="grid grid-cols-12">
                            <div className="col-span-6"></div>
                            <div className="col-span-6 flex justify-end">
                                <div className="inline-flex rounded-md overflow-hidden border-s border-t border-b border-primary *:p-1 *:text-xs *:w-10 *:min-h-6 *:leading-6 *:text-center *:border-e *:border-primary">
                                    <button disabled={page == 1 ? true : false} onClick={() => setPage(1)}>
                                        First
                                    </button>
                                    <button disabled={page == 1 ? true : false} onClick={() => setPage(prev => prev - 1)}>
                                        <LeftOutlined />
                                    </button>
                                    <div className='min-w-10'>
                                        {pagination?.page}/{pagination?.totalPage}
                                    </div>
                                    <button disabled={page == pagination?.totalPage ? true : false} onClick={() => setPage(prev => prev + 1)}>
                                        <RightOutlined />
                                    </button>
                                    <button disabled={page == pagination?.totalPage ? true : false} onClick={() => setPage(pagination.totalPage)}>
                                        Last
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mb-5">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="lg:col-span-2 col-span-4">
                                <label htmlFor="">Select State</label>
                                <select onChange={(e) => setSelectedState(e.target.value)} className="px-2 py-1 text-xs outline-none border border-blue-gray-200 w-full rounded">
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
                                <select onChange={(e) => setSelectedCity(e.target.value)} className="px-2 py-1 text-xs outline-none border border-blue-gray-200 w-full rounded">
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
                            <div className="col-span-2">

                                <label htmlFor="">Status</label>
                                <select name="marital_status" onChange={handleFilters} className={'px-2 py-1 text-xs outline-none border border-blue-gray-200 w-full rounded'} >
                                    <option value="">All</option>
                                    {
                                        ['single', 'married', 'divorced', 'widowed'].map(itm => (
                                            <>
                                                <option value={itm}>{itm}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="">Employment</label>
                                <input name="employment" type='text' onChange={handleFilters} className={'px-2 py-1 text-xs outline-none border border-blue-gray-200 w-full rounded'} />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="">Drink status</label>
                                <select name="drink_status" onChange={handleFilters} className={'px-2 py-1 text-xs outline-none border border-blue-gray-200 w-full rounded'} >
                                    <option value="">All</option>
                                    {
                                        ['Not at all', 'Socially', 'Teetotaler', 'Regularly'].map(itm => (
                                            <>
                                                <option value={itm}>{itm}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="">Diet</label>
                                <select name="diet" onChange={handleFilters} className={'px-2 py-1 text-xs outline-none border border-blue-gray-200 w-full rounded'} >
                                    <option value="">All</option>
                                    {
                                        mvals.filter(obj => obj.column_type == "diet").map(itm => (
                                            <>
                                                <option value={itm.title}>{itm.title}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="">Search Keyword</label>
                                <input type="text" name="user_keyword" onChange={handleFilters} className={'px-2 py-1 text-xs outline-none border border-blue-gray-200 w-full rounded'} />
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
                                                <div className="lg:col-span-12 col-span-12 mb-6">
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
                                suubscription.length == 0
                                    ?
                                    <>
                                        <div className="p-4 bg-primary/20 text-primary" onClick={() => navigate('/subscriptions')}>


                                            Please Donate to the Society

                                        </div>
                                    </>
                                    :
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
