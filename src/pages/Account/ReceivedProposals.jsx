import React from 'react'
import { API_URL, usertoken } from '../../utils';
import axios from 'axios';
import { useUser } from './UserContext';
import UserBox from './UserBox';


const ReceivedProposals = () => {
    const { user } = useUser();
    const [users, setUsers] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const token = localStorage.getItem(usertoken);
    const getusers = async () => {
        try {
            setLoad(true);
            const resp = await axios.get(API_URL + "user/connection?type=received&status=pending", {
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
    }, []);
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12 gap-5">

                        {
                            users.map((user) => (
                                <>
                                    <div className="col-span-12 mb-5">
                                        <UserBox viewType='sentProposals' userdata={user.receiver} />
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

export default ReceivedProposals
