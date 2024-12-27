// import React from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../utils';

const UserProfile = ({ userdata }) => {
  // Check if the profile image exists, otherwise use a placeholder
  const profileImage = userdata?.profile_image ? `${BASE_URL}${userdata.profile_image}` : 'https://via.placeholder.com/150';

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    return age;
  };

  const convertHeight = (decimalHeight) => {
    if (decimalHeight) {
      const [feet, inches] = decimalHeight.toString().split(".").map(Number);
      const totalInches = Math.round((inches / 10) * 12); // Convert decimal to inches
      return `${feet}'${totalInches}"`;
    } else {
      return "N/A";
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        {/* Profile Image */}
        <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-lg" />
        
        {/* User Info */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">{userdata.name} {userdata.last_name ?? ""}</h2>
          <p className="text-xl text-gray-600">Age: {calculateAge(userdata.date_of_birth)}</p>
          <p className="text-gray-600"><strong>City:</strong> {userdata.city?.title ?? "N/A"}, {userdata.state?.title ?? "N/A"}</p>
          <p className="text-gray-600"><strong>Occupation:</strong> {userdata.occupation?.title ?? "N/A"}</p>
          <p className="text-gray-600"><strong>Diet:</strong> {userdata.diet?.title ?? "N/A"}</p>
          <p className="text-gray-600"><strong>Marital Status:</strong> {userdata.marital_status ?? "N/A"}</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">About Me</h3>
        <p className="text-gray-600 mt-2">{userdata?.about_me ?? "No bio available"}</p>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <p className="font-semibold text-gray-700"><strong>Eye Color:</strong> {userdata.eye_color ?? "N/A"}</p>
          <p className="font-semibold text-gray-700"><strong>Father&apos;s Gautra:</strong> {userdata.fathergautra ?? "N/A"}</p>
          <p className="font-semibold text-gray-700"><strong>Mother&apos;s Gautra:</strong> {userdata.mothergautra ?? "N/A"}</p>
          <p className="font-semibold text-gray-700"><strong>Annual Income:</strong> ₹{userdata.annual_income ?? "N/A"}</p>
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-gray-700"><strong>Education:</strong> {userdata.education?.[0]?.education?.title ?? "N/A"}</p>
          <p className="font-semibold text-gray-700"><strong>Pincode:</strong> {userdata.pincode ?? "N/A"}</p>
        </div>
      </div>

      {/* Height Section */}
      <div className="mt-6">
        <p className="font-semibold text-gray-700"><strong>Height:</strong> {convertHeight(userdata.height)}</p>
      </div>

   

      {/* Interest Status */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Interest Status</h3>
        <p className="text-sm text-gray-600 mt-2">Status: <span className="text-green-600 font-semibold">{userdata.interest?.status === 'accepted' ? 'Accepted' : 'Pending'}</span></p>
      </div>
    </div>
  );
};

// Add prop types validation
UserProfile.propTypes = {
    userdata: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        last_name: PropTypes.string,
        email: PropTypes.string,
        mobile: PropTypes.string,
        adhar_no: PropTypes.string,
        adhar_verify: PropTypes.bool,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
        state: PropTypes.shape({
            title: PropTypes.string,
        }),
        date_of_birth: PropTypes.string.isRequired,
        height: PropTypes.number,
        occupation: PropTypes.shape({
            title: PropTypes.string,
        }),
        profile_image: PropTypes.string,
        favourite: PropTypes.bool,
        interest: PropTypes.shape({
            _id: PropTypes.string,
            status: PropTypes.string,
        }),
        about_me: PropTypes.string,
        eye_color: PropTypes.string,
        fathergautra: PropTypes.string,
        mothergautra: PropTypes.string,
        annual_income: PropTypes.string,
        education: PropTypes.arrayOf(
            PropTypes.shape({
                education: PropTypes.shape({
                    title: PropTypes.string,
                }),
                completed_year: PropTypes.number,
            })
        ),
        pincode: PropTypes.string,
        marital_status: PropTypes.string,
        diet: PropTypes.shape({
            title: PropTypes.string,
        }),
    }).isRequired,
    sendInsterest: PropTypes.func.isRequired,
    handleWishlist: PropTypes.func.isRequired,
    handleConnection: PropTypes.func,
    viewType: PropTypes.string,
};

export default UserProfile;
