import React from 'react'
import Loading from '../../components/Loading'
import axios from 'axios'
import { API_URL, usertoken } from '../../utils'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState('');
    const [fdata, setFdata] = React.useState({ email: "", password: "" });
    const [loading, setLoading] = React.useState(false);
    const handleFdata = (e) => {
        setFdata({ ...fdata, [e.target.name]: e.target.value })
    }
    const handleLogin = async () => {
        try {
            setLoading(true);
            const resp = await axios.post(API_URL + "user/login", fdata);
            setLoading(false);
            if (resp.data.success == "1") {
                localStorage.setItem(usertoken, resp.data.token);
                navigate('/user/dashboard')
            }
            if (resp.data.success) {
                setMessage(resp.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <section className='relative'>
                {
                    loading && (
                        <>
                            <Loading />
                        </>
                    )
                }
                <div className="container">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="lg:col-span-8 col-span-12">
                            {
                                message && (
                                    <>
                                        <div className="form-group mb-5">
                                            <div className="p-2 bg-red-500 text-white">{message}</div>
                                        </div>
                                    </>
                                )
                            }
                            <div className="form-group mb-5">
                                <label htmlFor="">Enter Email</label>
                                <input type="text" name="email" onChange={handleFdata} value={fdata.email} className="form-control" />
                            </div>
                            <div className="form-group mb-5">
                                <label htmlFor="">Enter Password</label>
                                <input type="password" name='password' onChange={handleFdata} value={fdata.password} className="form-control" />
                            </div>
                            <div className="form-group mb-5">
                                <label htmlFor="">&nbsp;</label>
                                <button onClick={handleLogin} className="px-10 py-2 bg-primary text-white rounded">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginForm