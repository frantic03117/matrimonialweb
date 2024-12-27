import React from 'react'
import Loading from '../../components/Loading'
import axios from 'axios'
import { API_URL, usertoken } from '../../utils'
import { useNavigate } from 'react-router-dom'

const ChangePassword = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState('');
    const [fdata, setFdata] = React.useState({ newpassword: "", password: "" });
    const [loading, setLoading] = React.useState(false);
    const handleFdata = (e) => {
        setFdata({ ...fdata, [e.target.name]: e.target.value })
    }
    const handleLogin = async () => {

        if (fdata.newpassword == fdata.password) {
            try {
                setLoading(true);
                let json = {
                    verification_id: props.verification_id,
                    mobile: props.mobile,
                    password: fdata.password
                }
                const resp = await axios.post(API_URL + "user/generate-new-passworwd", json);
                setLoading(false);
                if (resp.data.success == "1") {
                    window.location.reload();
                }
                if (resp.data.success) {
                    setMessage(resp.data.message);
                }
            } catch (err) {
                setLoading(false);
                setMessage(err.response.data.message);

                console.log(err.response.data.message);
            }

        } else {
            setMessage("Password mismatch");

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
                                <label htmlFor="">Enter New Password </label>
                                <input type="password" name="newpassword" onChange={handleFdata} value={fdata.newpassword} className="form-control" />
                            </div>
                            <div className="form-group mb-5">
                                <label htmlFor="">Confirm Password</label>
                                <input type="password" name='password' onChange={handleFdata} value={fdata.confirmpassword} className="form-control" />
                            </div>
                            <div className="form-group mb-5">
                                <label htmlFor="">&nbsp;</label>
                                <button onClick={handleLogin} className="px-10 py-2 bg-primary text-white rounded">Update Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChangePassword