import axios from 'axios';
import React from 'react'
import { API_URL, usertoken } from '../../utils';
import Chat from './Chat';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';

const UserChat = () => {
    const { id } = useParams();
    const token = localStorage.getItem(usertoken);
    const [room, setRoom] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const createChatRoom = async () => {
        setLoading(true);
        const resp = await axios.post(API_URL + "chat/room", { user_id: id }, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log(resp);
        setRoom(resp.data.data);
        setLoading(false);
    }
    React.useEffect(() => {
        createChatRoom();
    }, []);
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <div className="w-full">
                                {
                                    room && (
                                        <>
                                            <Chat user_id={id} connectedRoom={room} />
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
