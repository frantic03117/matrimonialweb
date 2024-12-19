import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { API_URL, BASE_URL, usertoken } from '../../utils';
import { useUser } from './UserContext';

const Chat = ({ connectedRoom, user_id }) => {
    const { user } = useUser();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);


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
    }, [connectedRoom])
    useEffect(() => {
        if (connectedRoom) {
            const wsClient = new W3CWebSocket('wss://localhost:5900'); // Replace with your backend WebSocket URL

            wsClient.onopen = () => {
                console.log('WebSocket Client Connected');
                wsClient.send(JSON.stringify({ type: 'joinRoom', room: connectedRoom }));
            };

            wsClient.onmessage = (message) => {
                const data = JSON.parse(message.data);
                console.log('Received:', data);
                setMessages((prev) => [...prev, data]);
            };

            wsClient.onclose = () => {
                console.log('WebSocket Client Disconnected');
            };

            setClient(wsClient);

            return () => {
                wsClient.close();
            };
        }
    }, [connectedRoom]);

    const joinRoom = () => {
        if (connectedRoom.trim()) {

            setMessages([]);
        }
    };

    const sendMessage = async () => {
        await axios.post(API_URL + "chat", { room: connectedRoom, message }, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if (message.trim() && client && client.readyState === client.OPEN) {
            const data = { room: connectedRoom, message };
            client.send(JSON.stringify(data));
            setMessages((prev) => [...prev, { message, sender: 'You' }]);
            setMessage('');
        }
        getchats();
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>


            {!connectedRoom ? (
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter room name"


                        style={{ width: '70%', padding: '10px', marginRight: '10px' }}
                    />
                    <button onClick={joinRoom} style={{ padding: '10px 20px' }}>
                        Join Room
                    </button>
                </div>
            ) : (
                <div style={{ marginBottom: '20px' }}>
                    <p className='hidden'>
                        Connected to room: <strong>{connectedRoom}</strong>
                    </p>
                </div>
            )}

            <div
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    height: '300px',
                    overflowY: 'auto',
                    marginBottom: '20px',
                }}
            >
                {messages.map((msg) => (
                    <>

                        <div className={`flex w-[80%] py-3 ${msg.sender._id == user._id ? 'ms-auto justify-end' : 'me-auto justify-start'}`}>
                            {
                                msg.sender._id == user._id && (
                                    <>
                                        <div className="size-10">
                                            <img src={BASE_URL + msg.sender?.profile_image} alt="" className="size-full rounded-full" />
                                        </div>
                                    </>
                                )
                            }

                            <div className={`inline-block max-w-[80%] bg-primary/20 p-4 text-wrap text-xs font-light rounded-lg`}>
                                {msg.message || msg}
                            </div>
                            {
                                msg.sender._id != user._id && (
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
            </div>

            {connectedRoom && (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Enter message"
                        value={message}
                        className="form-control"
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ flex: 1, padding: '10px' }}
                    />
                    <button disabled={!message} onClick={sendMessage} className='btn disabled:bg-gray-800 bg-primary text-white rounded p-3'>
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default Chat;
