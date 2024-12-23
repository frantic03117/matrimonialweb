// import React from 'react'
// import loginbg from '../../assets/login-couple.png'
import React from 'react'
import LoginForm from './LoginForm'
// import RegisterUser from './RegisterUser'
import SendOtp from './SendOtp'
import { useUser } from '../Account/UserContext'
import { useNavigate } from 'react-router-dom'
// import Loading from '../../components/Loading';


const Login = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();
    // if (user) {
    //     navigate('/user/dashboard')
    // }
    const [isSignup, setSignup] = React.useState(false);


    return (
        <>
            <section className='py-20 relative'>
                {/* <Loading/> */}
                <div className="container">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-1"></div>
                        <div className="col-span-10">
                            <div className="w-full">
                                <div className="grid grid-cols-12 gap-0">
                                    <div className="lg:col-span-4 col-span-12 ">
                                        <div className="w-full h-full rounded-s-2xl relative overflow-hidden bg-yellow-200 ">
                                            <div className="w-full  *:mb-3 h-full px-10 pt-10 ">
                                                <h4 className='lg:text-2xl text-lg font-light'>Now</h4>
                                                <h2 className='cursive text-primary font-bold lg:text-[2.7rem] text-[1.3rem]'>
                                                    Find your life partner
                                                </h2>
                                                <h4 className='lg:text-2xl text-lg font-light'>
                                                    Easy & Fast
                                                </h4>
                                            </div>
                                            <figure className="w-full mb-20 px-10 mx-auto">
                                                {/* <img src={loginbg} alt="" className="w-full" /> */}
                                            </figure>
                                            <div className="loginbg"></div>
                                        </div>

                                    </div>
                                    <div className="lg:col-span-8 col-span-12">
                                        <div className="w-full h-full themeform rounded-e-3xl bg-yellow-100/90 lg:p-10 p-4">
                                            <h2 className='section_title mb-4'>Sign in to Matrimony</h2>
                                            {
                                                isSignup ? (
                                                    <>
                                                        <SendOtp />
                                                        <p>
                                                            Already have an account? <button className=' underline text-primary' onClick={() => setSignup(false)}>Login </button>
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <LoginForm />
                                                        <p>
                                                            Dont have an account? <button className=' underline text-primary' onClick={() => setSignup(true)}>Sign up </button>
                                                        </p>
                                                    </>
                                                )
                                            }


                                            {/* <RegisterUser/> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login