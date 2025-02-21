import { Radio } from '@material-tailwind/react'
import axios from 'axios';
import { API_URL, usertoken } from '../../utils';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

// eslint-disable-next-line react/prop-types
const RegisterUser = ({ mobile }) => {
    const navigate = useNavigate();
    const [fname, setFname] = React.useState('');
    const [lname, setLName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [conf_password, setConfPassword] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [file, setFile] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const [adhar, setAadhar] = React.useState('');
    const [aadhaarOtp, setaadhaarOtp] = React.useState('')
    const [aadhaarVerify, setaadhaarVerify] = React.useState(false)
    const [aadhaarDataOtpGenerateddata, setaadhaarDataOtpGenerateddata] = React.useState(null)
    const [aadhaarAddress, setaadhaarAddress] = React.useState("")
    const [aadhaarDob, setaadhaarDob] = React.useState("")
    const [aadhaarImage, setaadhaarImage] = React.useState("")
    const [loader, setloader] = React.useState(false)

    const validate = () => {
        let err = [];
        if (!fname) {
            err.push({ path: "fname", msg: "First name is required" })
        }
        if (!email) {
            err.push({ path: "email", msg: "email  is required" })
        }
        if (!password) {
            err.push({ path: "password", msg: "password  is required" })
        }
        if (password != conf_password) {
            err.push({ path: "password", msg: "Confirm password  is mismatch" })
        }
        if (!gender) {
            err.push({ path: "gender", msg: "gender is required" })
        }
        if (!file) {
            err.push({ path: "file", msg: "Profile is required" })
        }
        if (!adhar) {
            err.push({ path: "adhar", msg: "Aadhar is required" })
        }
        if (err.length > 0) {
            setErrors(err);
            return false;
        }
        return true;
    }
    const handleFile = (e) => {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
        }
    }
    const handleRegister = async () => {
        try {
            if (validate()) {
                console.log(aadhaarImage);
                const formData = new FormData();
                formData.append('name', fname);
                formData.append('last_name', lname);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('gender', gender);
                formData.append('file', file);
                formData.append('mobile', mobile);
                formData.append('adhar_no', adhar);
                const resp = await axios.post(API_URL + "user", formData);
                if (resp.data.success == "1") {
                    localStorage.setItem(usertoken, resp.data.token);
                    navigate('/subscriptions')
                } else {
                    setStatus(0);
                    setMessage(resp.data.message);
                }
            } else {
                setStatus(0);
                setMessage('Invalid request');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangeAadhaar = async (aadhaar) => {

        try {
            setAadhar(aadhaar)

            if (aadhaar.length == 12) {
                setloader(true)
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: API_URL + "user/send-aadhaar-otp",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({ aadhaar_number: aadhaar })
                };

                axios.request(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data.data));
                        setaadhaarDataOtpGenerateddata(response.data.data)
                        setloader(false)

                    })
                    .catch((error) => {
                        console.log(error);
                        setloader(false)

                    });


                // const resp = await axios.post(API_URL + "user/send-aadhaar-otp", JSON.stringify({aadhaar_number : aadhaar}));
                // console.log(resp)
            }

        } catch (err) {
            console.log(err);
        }

    }
    const handleChangeAadhaarOtp = async (aadhaarOtp) => {

        try {
            setaadhaarOtp(aadhaarOtp)

            if (aadhaarOtp.length == 6) {
                setloader(true)
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: API_URL + "user/recieve-aadhaar-otp",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({ transaction_id: aadhaarDataOtpGenerateddata?.transaction_id, otp: aadhaarOtp })
                };

                axios.request(config)
                    .then((response) => {
                        console.log("otp", JSON.stringify(response.data));

                        setFname(response.data?.data?.data?.aadhaar_data?.name)
                        setGender(response.data?.data?.data?.aadhaar_data?.gender.toLowerCase())
                        setaadhaarAddress(response.data?.data?.data?.aadhaar_data?.house + " " + response.data?.data?.data?.aadhaar_data?.street + " " + response.data?.data?.data?.aadhaar_data?.district + " " + response.data?.data?.data?.aadhaar_data?.landmark + " " + response.data?.data?.data?.aadhaar_data?.locality + " " + response.data?.data?.data?.aadhaar_data?.state + " " + response.data?.data?.data?.aadhaar_data?.pincode + " " + response.data?.data?.data?.aadhaar_data?.country)
                        setaadhaarDob(response.data?.data?.data?.aadhaar_data?.date_of_birth)
                        setaadhaarImage(response.data?.data?.data?.aadhaar_data?.photo_base64)
                        setaadhaarVerify(response.data?.data?.data?.code == "1002" ? true : false)
                        setloader(false)

                    })
                    .catch((error) => {
                        console.log(error);
                        setloader(false)
                    });

            }

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12 gap-5 mb-10">
                        {
                            message && (
                                <>
                                    <div className="col-span-12">
                                        <div className={`w-full p-3 text-white ${status == "0" ? 'bg-red-500' : 'bg-green-500'}`}>
                                            {message}
                                        </div>
                                    </div>

                                </>
                            )
                        }

                        <div className="col-span-12">
                            <div className={`w-full`}>
                                <ul className='text-black list-disc text-sm'>
                                    <li>
                                        Only the details of the groom and bride should be entered
                                    </li>
                                    <li>
                                        Profile should have data of prospective groom/bride
                                    </li>
                                    <li>
                                        Password must be at least 6 characters long and contain at least one special character.
                                    </li>
                                    <li>
                                        Adhar must be at a valid 12 digit number.
                                    </li>
                                </ul>

                            </div>
                        </div>
                        {
                            loader
                                ?
                                <Loading />
                                :
                                null
                        }
                        <div className="col-span-6">
                            <div className="form-group">
                                <label htmlFor="">Enter Aadhar</label>
                                <input type="text" value={adhar} maxLength={12} minLength={12}
                                    onChange={(e) => handleChangeAadhaar(e.target.value)}
                                    className="form-control" />
                                <span className='block text-red-500 text-xs'>
                                    {errors.find(obj => obj.path == "adhar")?.msg}
                                </span>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="form-group">
                                <label htmlFor="">Enter Aadhar Otp</label>
                                <input type="password" value={aadhaarOtp} maxLength={12} minLength={12} onChange={(e) => handleChangeAadhaarOtp(e.target.value)} className="form-control" />
                                {/* <span className='block text-red-500 text-xs'>
                                    {errors.find(obj => obj.path == "adhar")?.msg}
                                </span> */}
                            </div>
                        </div>
                        {aadhaarVerify ?
                            <>
                                <div className="col-span-6">
                                    <div className="form-group">
                                        <label htmlFor="">Enter First Name</label>
                                        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="form-control" />
                                        <span className='block text-red-500 text-xs'>
                                            {errors.find(obj => obj.path == "fname")?.msg}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="form-group">
                                        <label htmlFor="">Enter Last Name</label>
                                        <input type="text" value={lname} onChange={(e) => setLName(e.target.value)} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    <div className="form-group">
                                        <label htmlFor="">Enter Email</label>
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                        <span className='block text-red-500 text-xs'>
                                            {errors.find(obj => obj.path == "email")?.msg}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    <div className="form-group">
                                        <label htmlFor="">Enter Password</label>
                                        <input type="password" value={conf_password} onChange={(e) => setConfPassword(e.target.value)} className="form-control" />
                                        <span className='block text-red-500 text-xs'>
                                            {errors.find(obj => obj.path == "password")?.msg}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="form-group">
                                        <label htmlFor="">Confirm Password</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                        <span className='block text-red-500 text-xs'>
                                            {errors.find(obj => obj.path == "password")?.msg}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="form-group">
                                        <label htmlFor="">Select Gender</label>
                                        <div className="flex gap-2">
                                            <Radio name="gender" onChange={() => setGender('Male')} value="male" label="Male" />
                                            <Radio name="gender" onChange={() => setGender('Female')} value="Female" label="Female" />
                                        </div>
                                        <span className='block text-red-500 text-xs'>
                                            {errors.find(obj => obj.path == "gender")?.msg}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="form-group">
                                        <label htmlFor="">Select Profile Photo</label>
                                        <input type="file" onChange={handleFile} className="form-control" />
                                        <span className='block text-red-500 text-xs'>
                                            {errors.find(obj => obj.path == "file")?.msg}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="form-group">
                                        <label htmlFor="">Aaadhaar Dob</label>
                                        <input type="text" value={aadhaarDob}
                                            // onChange={(e) => setaadhaarDob(e.target.value)} 
                                            className="form-control" />
                                        {/* <span className='block text-red-500 text-xs'>
                                    {errors.find(obj => obj.path == "password")?.msg}
                                </span> */}
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="form-group">
                                        <label htmlFor="">Aadhaar Address</label>
                                        <input type="text" value={aadhaarAddress} className="form-control" />
                                        {/* <span className='block text-red-500 text-xs'>
                                    {errors.find(obj => obj.path == "file")?.msg}
                                </span> */}
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <button disabled={!fname || !password || !email || !gender || !adhar} onClick={handleRegister} className="bg-primary disabled:bg-gray-600 py-2 px-10 text-white rounded">Submit</button>
                                </div>
                            </>
                            : null}
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterUser