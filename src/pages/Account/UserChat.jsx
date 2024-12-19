import axios from 'axios';
import React from 'react'
import { API_URL, BASE_URL, usertoken } from '../../utils';
import Chat from './Chat';

const UserChat = () => {
    const [users, setUsers] = React.useState([]);
    const token = localStorage.getItem(usertoken);
    const [room, setRoom] = React.useState('');
    const [user_id, setUserId] = React.useState('');
    const handleRoom = (rid, uid) => {
        setUserId(uid);
        setRoom(rid);
    }
    const getusers = async () => {
        const resps = await axios.get(API_URL + "chat/room", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setUsers(resps.data.data);
    }
    React.useEffect(() => {
        getusers();
    }, []);
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                            <div className="w-full">
                                {
                                    users.map((usr) => (
                                        <>
                                            <div className={`w-full ${usr._id == room ? 'bg-primary/20' : 'bg-white'}  gap-2 border border-primary   flex  rounded-full p-3`} onClick={() => handleRoom(usr._id, usr.room_user._id)}>
                                                <div className="size-10">
                                                    <img src={usr.room_user?.profile_image ? BASE_URL + usr.room_user?.profile_image : 'https://via.placeholder.com/150'} alt="" className="size-full rounded-full" />
                                                </div>
                                                <div className="w-[calc(100%-3rem)] text-lg font-light">
                                                    <h4>{usr?.room_user?.name}</h4>

                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-span-8">
                            <div className="w-full">
                                {
                                    room && (
                                        <>
                                            <Chat user_id={user_id} connectedRoom={room} />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserChat
