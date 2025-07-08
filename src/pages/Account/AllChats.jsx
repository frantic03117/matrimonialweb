import axios from 'axios';
import React, { useEffect } from 'react'
import { API_URL, BASE_URL, usertoken } from '../../utils';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

const AllChats = () => {
    const [users, setUsers] = React.useState([]);
    const token = localStorage.getItem(usertoken);
    const [loading, setLoding] = React.useState(true);
    const getusers = async () => {
        setLoding(true);
        const resp = await axios.get(API_URL + "chat/room", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setUsers(resp.data.data);
        setLoding(false);
    }
    useEffect(() => {
        getusers();
    }, []);
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <section>
                <div className="container mx-auto">
                    <div className="grid grid-cols-12">
                        <div className="col-span-4">
                            <div className="w-full">
                                {
                                    users.map(itm => (
                                        <>
                                            <Link to={'/chat/' + itm.room_user?._id} className="w-full block bg-white cursor-pointer my-4 p-2 border border-gray-400 rounded">
                                                <div className="flex gap-4">
                                                    <div className="size-10">
                                                        <img src={itm?.room_user?.profile_image ? BASE_URL + itm.room_user.profile_image : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} alt="" className="w-full h-full rounded-full" />
                                                    </div>
                                                    <div className="w-[calc(100%-3rem)]">
                                                        <h4>{itm.room_user?.name} {itm.room_user?.last_name}</h4>
                                                    </div>
                                                </div>

                                            </Link>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AllChats
