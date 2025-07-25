import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AccountLayout from "./pages/Account/AccountLayout";
import Dashboard from "./pages/Account/Dashboard";
import UpdateProfile from "./pages/Account/UpdateProfile";
import FindUsers from "./pages/Account/FindUsers";
import Plans from "./pages/Account/Plans";
import SentProposals from "./pages/Account/SentProposals";
import Contact from "./pages/Contact";
import About from "./pages/About";
import UserChat from "./pages/Account/UserChat";
import AppPolicy from "./pages/Policy";
import Faqs from "./pages/Faq";
import PaymentResponse from "./pages/Payment/PaymentResponse";
import ResetPassword from "./pages/Login/ResetPassword";
import ProfilePage from "./pages/Account/ProfilePage";
import Gallery from "./pages/Account/Gallery";
import Blogs from "./pages/blogs";
import SingleBlog from "./pages/blogs/SingleBlog";
import AllChats from "./pages/Account/AllChats";

function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy/:url" element={<AppPolicy />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:url" element={<SingleBlog />} />
        </Route>

        <Route path="/" element={<AccountLayout />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/profile" element={<UpdateProfile />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/users" element={<FindUsers />} />
          <Route path="/subscriptions" element={<Plans />} />
          <Route path="/proposals/:type" element={<SentProposals />} />
          <Route path="/chat/:id" element={<UserChat />} />
          <Route path="/chats" element={<AllChats />} />
          <Route path="/payment-response/:id" element={<PaymentResponse />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </>
    )
  )
  return (
    <>
      <RouterProvider router={ThemeRoutes} />
    </>
  )
}

export default App
