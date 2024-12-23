import axios from 'axios';
import React from 'react'
import OtpInput from 'react-otp-input';
import { API_URL } from '../../utils';
import Loading from '../../components/Loading';
import RegisterUser from './RegisterUser';

const SendOtp = () => {
    const [mobile, setMobile] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [msg, setMsg] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [step, setStep] = React.useState(0);
    const sendOtp = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const resp = await axios.post(API_URL + "user/send-otp", { mobile });
            setStatus(resp.data.success);
            setMsg(resp.data.message);
            if (resp.data.success == "1") {
                setStep(1)
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    const verifyOtp = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const resp = await axios.post(API_URL + "user/verify-otp", { mobile, otp });
            setLoading(false);
            if (resp.data.success == "1") {
                setStep(2)
            }
            if (resp.data.success == "0") {
                setMsg(resp.data.message);
                setStatus(0);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            {
                step == 2 ? (
                    <>
                        <RegisterUser mobile={mobile} />
                    </>
                ) : (
                    <>

                        <div className="w-full relative">
                            {
                                loading && (
                                    <>
                                        <Loading />
                                    </>
                                )
                            }
                            {
                                msg && (
                                    <>
                                        <div className="form-group mb-5">
                                            <div className={`p-4 text-xs rounded ${status == "1" ? 'bg-green-600' : 'bg-red-500'}  text-white`}>{msg}</div>
                                        </div>
                                    </>
                                )
                            }
                            <div className="form-group mb-8">


                                <label htmlFor="" className='mb-3 block font-light uppercase  tracking-widest text-primary'>Enter Mobile</label>
                                <div className="w-full">
                                    <div className="flex lg:flex-nowrap flex-wrap  lg:gap-2 gap-1">
                                        <span className="inline-flex items-center justify-center bg-white rounded-s size-10 min-h-12 lg:w-16 w-12 border border-primary/30">+91</span>
                                        <input type="text" readOnly={status == 1 ? true : false} value={mobile} onChange={(e) => setMobile(e.target.value)} className=" w-[calc(100%-4rem)] p-2 outline-none   rounded-e border border-primary/30" />
                                        <button disabled={status == "1" || !mobile ? true : false} onClick={sendOtp} className='btn bg-primary disabled:bg-gray-700 text-white lg:px-10 px-2 py-2 text-nowrap lg:rounded-e-lg rounded'>Send OTP</button>
                                    </div>
                                </div>
                            </div>
                            {
                                step == 1 && (
                                    <>
                                        <div className="form-group otpbox mb-8">
                                            <label htmlFor="" className='mb-3 block font-light uppercase  tracking-widest text-primary'>Enter OTP</label>
                                            <OtpInput

                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={4}

                                                renderSeparator={<span className='me-4'></span>}
                                                renderInput={(props) => <input {...props} />}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p className='mb-7 text-primary font-light text-sm'>
                                                Clicking verify otp means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings.
                                            </p>
                                            <button disabled={!otp} onClick={verifyOtp} className='btn bg-primary disabled:bg-gray-600 text-white px-10 py-2 text-nowrap rounded'>Verify OTP</button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default SendOtp