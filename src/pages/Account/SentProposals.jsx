import React from 'react'
import { API_URL, usertoken } from '../../utils';
import axios from 'axios';
// import { useUser } from './UserContext';
import UserBox from './UserBox';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const SentProposals = () => {

    // const { user } = useUser();
    const { type } = useParams();
    const [users, setUsers] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const token = localStorage.getItem(usertoken);
    const [pstatus, setPstatus] = React.useState('pending');

    const handleConnection = async (status, id) => {
        try {
            setLoad(true)
            const resp = await axios.post(API_URL + "user/connection-handle", { status: status, user_id: id }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            if (resp.data.success == "1") {
                getusers();
            }

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
    const getusers = async () => {
        try {
            setLoad(true);
            // const resp = await axios.get(API_URL + "user/connection?type=sent&status=pending", {
            //     headers: {
            //         Authorization: "Bearer " + token
            //     }
            // });
            const resp = await axios.get(API_URL + `user/all?proposal=${type}&proposal_status=${pstatus}`, {
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
    React.useEffect(() => {
        getusers();
    }, [type, pstatus]);
    return (
        <>
            <section className='relative'>
                {
                    load && (
                        <>
                            <Loading height={'min-h-lvh h-lvh'} />
                        </>
                    )
                }
                <div className="container">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-2">
                            <div className="flex gap-2">
                                <button onClick={() => setPstatus('pending')} className={` p-2 text-sm ${pstatus == 'pending' ? 'bg-primary text-white' : 'bg-gray-400'}`}>
                                    Pending
                                </button>
                                <button onClick={() => setPstatus('accepted')} className={`p-2 text-sm ${pstatus == 'accepted' ? 'bg-primary text-white' : 'bg-gray-400'}`}>
                                    Accepted
                                </button>
                            </div>
                        </div>
                        {
                            users.length == 0 && (
                                <>
                                    <div className="col-span-12">
                                        <div className="w-full text-sm text-primary p-4 bg-primary/20">
                                            No user found.
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {
                            users.map((user) => (
                                <>
                                    <div className="col-span-12 mb-5">
                                        <UserBox handleConnection={handleConnection} handleWishlist={handleWishlist} viewType={type} userdata={user} />
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

export default SentProposals
