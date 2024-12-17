// import React from 'react'

import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "../../layout/Header"
import Footer from "../../layout/Footer"
import { UserProvider } from "./UserContext"

const AccountLayout = () => {
    return (
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

export default AccountLayout