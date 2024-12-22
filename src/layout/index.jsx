// import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { UserProvider } from '../pages/Account/UserContext'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
    return (
        <>
            <UserProvider>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      
        />

                <Header />
                <Outlet />
                <Footer />
            </UserProvider>
        </>
    )
}

export default Layout