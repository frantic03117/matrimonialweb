import axios from 'axios';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { API_URL, BASE_URL, usertoken } from '../../utils';
import { useUser } from './UserContext';
import Loading from '../../components/Loading';
import PropTypes from 'prop-types';

import { DeleteOutlined } from '@ant-design/icons';

const Chat = ({ connectedRoom, user_id }) => {
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const scrollToBottom = () => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };
    const { user } = useUser();
    const socketRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const handleDelte = async (id) => {
        const resp = await axios.delete(API_URL + "chat/delete/" + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if (resp.data.success == "1") {
            getchats();
        }
        getchats();
    }

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 1500);

    }, []);

    const token = localStorage.getItem(usertoken);

    const getchats = async () => {
        const resp = await axios.get(API_URL + "chat?user_id=" + user_id, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setMessages(resp.data.data)
    }

    React.useEffect(() => {
        getchats();
    }, [connectedRoom]);



    const sendMessage = async () => {
        await axios.post(API_URL + "chat", { room: connectedRoom, message }, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setMessage('')

        getchats();
    };

    useEffect(() => {
        const socket = new WebSocket('wss://localhost:5900');
        socketRef.current = socket;
        socket.onopen = () => {
            console.log('WebSocket connected');
            socket.send(JSON.stringify({
                type: 'joinRoom',
                room: connectedRoom,
                user_id: user_id,
            }));
        };


        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message received:', data);
            setMessages((prev) => [...prev, data]);
        };

        socket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            socket.close();
        };

    }, [connectedRoom, user_id]);
    if (!user) {
        return <Loading />
    }
    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>



            <div ref={messagesContainerRef} className='w-full  border border-gray-700 shadow-sm shadow-gray-600 p-10 rounded-lg h-[400px] overflow-y-auto'>
                {messages.map((msg) => (
                    <>

                        <div className={`flex w-[80%] relative py-3 ${msg?.sender?._id == user?._id ? 'justify-end ms-auto' : ''} `}>
                            {
                                msg?.sender?._id == user?._id && (
                                    <>
                                        <div className="size-10">
                                            <img src={BASE_URL + msg.sender?.profile_image} alt="" className="size-full rounded-full" />
                                        </div>
                                    </>
                                )
                            }

                            <div className={`inline-block max-w-[80%] relative min-w-[80%] bg-primary/20 p-4 text-wrap text-xs font-light rounded-lg`}>
                                {msg.message}


                                <div onClick={() => handleDelte(msg._id)} className="absolute cursor-pointer top-2 end-1">
                                    <DeleteOutlined />
                                </div>
                            </div>
                            {
                                msg?.sender?._id != user?._id && (
                                    <>
                                        <div className="size-10">
                                            <img src={BASE_URL + msg.sender?.profile_image} alt="" className="size-full rounded-full" />
                                        </div>
                                    </>
                                )
                            }

                        </div>

                    </>


                ))}
                <div className='mt-5 mb-5' ref={messagesEndRef} />
            </div>

            {connectedRoom && (
                <div className='flex mt-4' >
                    <input
                        type="text"
                        placeholder="Enter message"
                        value={message}
                        className="form-control !border-e-0 !rounded-e-none"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && message.trim()) {
                                sendMessage();
                            }
                        }}
                    />
                    <button disabled={!message} onClick={sendMessage} className='btn text-xs disabled:bg-gray-800 bg-primary text-white rounded p-3 rounded-s-none'>
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default Chat;

Chat.propTypes = {
    connectedRoom: PropTypes.string,
    user_id: PropTypes.string
}
