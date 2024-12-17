// import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { UserProvider } from '../pages/Account/UserContext'

const Layout = () => {
    return (
        <>
            <UserProvider>


                <Header />
                <Outlet />
                <Footer />
            </UserProvider>
        </>
    )
}

export default Layout