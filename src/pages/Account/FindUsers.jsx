import React from 'react'
import UserBox from './UserBox'
import axios from 'axios';
import { API_URL, usertoken } from '../../utils';
import Loading from '../../components/Loading';
// import { useUser } from './UserContext';
import { toast } from 'react-toastify';

const FindUsers = () => {
    // const { user } = useUser();
    const [users, setUsers] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const token = localStorage.getItem(usertoken);
    const getusers = async () => {
        try {
            setLoad(true);
            const resp = await axios.get(API_URL + "user/all", {
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
    const handleWishlist = async (id) => {
        try {
            setLoad(true);
            const resp = await axios.post(API_URL + "user/wishlist", { user_id: id, type: "Favourite" }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            if(resp.data.success == "1"){
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
            if(resp.data.success == "1"){
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
                <div className="container">
                    <div className="w-full mb-5">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-2">
                                <label htmlFor="">Select Gender</label>
                                <select name="" id="" className="form-control">
                                    <option value="">All</option>
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="">Select State</label>
                                <select name="" id="" className="form-control">
                                    <option value="">All</option>
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="">Select City</label>
                                <select name="" id="" className="form-control">
                                    <option value="">All</option>
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="">Marital Status</label>
                                <select name="" id="" className="form-control">
                                    <option value="">All</option>
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        {
                            users.map((usr) => (
                                <>
                                    {
                                        (usr.name && !usr.interest) && (
                                            <>
                                                <div className="col-span-10">
                                                    <UserBox handleWishlist={handleWishlist} sendInsterest={sendInsterest} userdata={usr} />
                                                </div>
                                            </>
                                        )
                                    }


                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default FindUsers
