/* eslint-disable react/prop-types */
// import React from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../utils';
import god from '../../assets/hindu.png'


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
    <>
      {/* <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">

        <div className="flex items-center space-x-6">

          <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-lg" />


          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">{userdata.name} {userdata.last_name ?? ""}</h2>
            <p className="text-xl text-gray-600">Age: {calculateAge(userdata.date_of_birth)}</p>
            <p className="text-gray-600"><strong>City:</strong> {userdata.city?.title ?? "N/A"}, {userdata.state?.title ?? "N/A"}</p>
            <p className="text-gray-600"><strong>Occupation:</strong> {userdata.occupation?.title ?? "N/A"}</p>
            <p className="text-gray-600"><strong>Diet:</strong> {userdata.diet?.title ?? "N/A"}</p>
            <p className="text-gray-600"><strong>Marital Status:</strong> {userdata.marital_status ?? "N/A"}</p>
          </div>
        </div>


        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800">About Me</h3>
          <p className="text-gray-600 mt-2">{userdata?.about_me ?? "No bio available"}</p>
        </div>

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


        <div className="mt-6">
          <p className="font-semibold text-gray-700"><strong>Height:</strong> {convertHeight(userdata.height)}</p>
        </div>




        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Interest Status</h3>
          <p className="text-sm text-gray-600 mt-2">Status: <span className="text-green-600 font-semibold">{userdata.interest?.status === 'accepted' ? 'Accepted' : 'Pending'}</span></p>
        </div>
      </div> */}
      <div className="max-w-4xl mx-auto  p-6 bg-white rounded-lg shadow-xl">
        <div className="container">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="w-full">
                <img src={god} alt='image' className='mx-auto max-h-[64px]' />
                <h3 className='text-primary text-lg text-center'>
                  BIODATA
                </h3>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="w-full">
                <h3 className='text-white bg-primary p-1 text-sm  inline-block md:w-[45%] w-[100%] mb-3' style={{ clipPath: 'polygon(0% 0%, 25% 0%, 77% 0%, -3% 662%)' }}>
                  PERSONAL DETAILS
                </h3>

              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1">
            <div className="col-span-1 md:order-1 order-2">
              {/* User Info */}
              <div className="py-4 space-y-2">

                <p className="text-sm text-black font-semibold">NAME : <span className='font-normal text-sm'> {userdata.name} {userdata.last_name}</span></p>
                <p className="text-sm text-black font-semibold">Age : <span className='font-normal text-sm'>{calculateAge(userdata.date_of_birth)}</span></p>
                <p className="text-sm text-black font-semibold">DATE OF BIRTH : <span className='font-normal text-sm'>  {new Date(userdata.date_of_birth).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</span></p>

                <p className="text-sm text-black font-semibold">GENDER : <span className='font-normal text-sm'> {userdata.gender} </span></p>
                <p className="text-sm text-black font-semibold">EYE COLOUR : <span className='font-normal text-sm'> {userdata.eye_color} </span></p>
                <p className="text-sm text-black font-semibold">HEIGHT : <span className='font-normal text-sm'> {convertHeight(userdata.height)} </span></p>
                <p className="text-sm text-black font-semibold">DIET : <span className='font-normal text-sm'> {userdata.diet.title} </span></p>
                <p className="text-sm text-black font-semibold">EDUCATION :<span className='font-normal text-sm'>{userdata.education?.[0]?.education?.title ?? "N/A"}</span></p>
                <p className="text-sm text-black font-semibold">GAUTRA : <span className='font-normal text-sm'> {userdata.gautra_avoided} </span></p>
                <p className="text-sm text-black font-semibold">MARITAL STATUS : <span className='font-normal text-sm'> {userdata.marital_status} </span></p>
                <p className="text-sm text-black font-semibold">OCCUPATION : <span className='font-normal text-sm'> {userdata.occupation.title} </span></p>
                <p className="text-sm text-black font-semibold">ANNUAL INCOME : <span className='font-normal text-sm'> {userdata.annual_income} </span></p>
                <p className="text-sm text-black font-semibold">EXPECTATIONS : <span className='font-normal text-sm'> {userdata.expectation} </span></p>
                <p className="text-sm text-black font-semibold">ABOUT ME : <span className='font-normal text-sm'> {userdata.about_me} </span></p>

              </div>
            </div>
            <div className="col-span-1 md:order-2 order-1">
              <div className="w-full">
                <img src={profileImage} alt="Profile" className="w-[14rem] h-[14rem]  object-cover shadow-lg" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="w-full">
                <h3 className='text-white bg-primary p-1 text-sm  inline-block  md:w-[45%] w-[100%] ' style={{ clipPath: 'polygon(0% 0%, 25% 0%, 77% 0%, -3% 662%)' }}>
                 NATIVE ADDRESS
                </h3>

              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              {/* User Info */}
              <div className="py-4 space-y-2">

                <p className="text-sm text-black font-semibold">CITY : <span className='font-normal text-sm'> {userdata.city.title}</span></p>
                <p className="text-sm text-black font-semibold">STATE: <span className='font-normal text-sm'> {userdata.state.title}</span></p>
                <p className="text-sm text-black font-semibold">PINCODE : <span className='font-normal text-sm'> {userdata.pincode} </span></p>


              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="w-full">
                <h3 className='text-white bg-primary p-1 text-sm  inline-block md:w-[45%] w-[100%]' style={{ clipPath: 'polygon(0% 0%, 25% 0%, 77% 0%, -3% 662%)' }}>
                  FAMILY DETAILS
                </h3>

              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              {/* User Info */}
              <div className="py-4 space-y-2">

                <p className="text-sm text-black font-semibold">MOTHER GAUTRA : <span className='font-normal text-sm'> {userdata.mothergautra}</span></p>
                <p className="text-sm text-black font-semibold">FATHER GAUTRA: <span className='font-normal text-sm'> {userdata.fathergautra}</span></p>



              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
