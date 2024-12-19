// import React from 'react'

import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "../../layout/Header"
import Footer from "../../layout/Footer"
import { UserProvider } from "./UserContext"
import { API_URL, usertoken } from "../../utils"
import React from "react"
import axios from "axios"
import Loading from "../../components/Loading"

const AccountLayout = () => {
    const token = localStorage.getItem(usertoken);
    const [load, setLoad] = React.useState(true);
    const [isAuth, setAuth] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const authorized = async () => {
        try {
            setLoad(true);
            const users = await axios.get(API_URL + "user/all?id=self", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            if (users.data.success == "1") {
                setAuth(true);
            } else {
                setAuth(false);
            }
        } catch (err) {
            localStorage.clear();
            navigate('/')
            console.log(err);
        } finally {
            setLoad(false);
        }
    }
    React.useEffect(() => {
        authorized();
    }, [location.pathname])
    return (
        <>
            {
                load ? (
                    <>
                        <Loading height={'min-h-lvh h-lvh'} />
                    </>
                ) : (
                    <>

                        {

                            isAuth && (
                                <>
                                    <UserProvider>
                                        <Header />
                                        <section className="py-10 bg-yellow-50/90">
                                            <div className="container">
                                                <div className="grid grid-cols-12 gap-6">
                                                    <div className="col-span-3">
                                                        <div className="w-full sticky top-0">
                                                            <Sidebar />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-9">
                                                        <Outlet />
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <Footer />
                                    </UserProvider>
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default AccountLayout