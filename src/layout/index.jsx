import React from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import { UserProvider } from '../pages/Account/UserContext'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
    const {pathname} = useLocation();
    React.useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname])
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