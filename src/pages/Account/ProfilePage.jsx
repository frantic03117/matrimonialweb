// import React from 'react';
import { useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';

const ProfilePage = () => {
    const location = useLocation(); // Access the state passed via Link
    const { userdata } = location.state || {}; // Get userdata from state

    if (!userdata) {
        return <div>No user data available</div>;
    }

   
    return (
       <>
        <UserProfile userdata={userdata}/>
       </>
    );
};

export default ProfilePage;
