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
import ReceivedProposals from "./pages/Account/ReceivedProposals";

function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<AccountLayout />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/profile" element={<UpdateProfile />} />
          <Route path="/users" element={<FindUsers />} />
          <Route path="/subscriptions" element={<Plans />} />
          <Route path="/sent-proposals" element={<SentProposals />} />
          <Route path="/received-proposals" element={<ReceivedProposals />} />
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
