import { Radio } from '@material-tailwind/react'
import axios from 'axios';
import { API_URL, usertoken } from '../../utils';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterUser = ({ mobile }) => {
    const navigate = useNavigate();
    const [fname, setFname] = React.useState('');
    const [lname, setLName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [file, setFile] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [errors, setErrors] = React.useState([]);
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
        if (!gender) {
            err.push({ path: "gender", msg: "gender is required" })
        }
        if (!file) {
            err.push({ path: "file", msg: "Profile is required" })
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


                const formData = new FormData();
                formData.append('name', fname);
                formData.append('last_name', lname);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('gender', gender);
                formData.append('file', file);
                formData.append('mobile', mobile);
                const resp = await axios.post(API_URL + "user", formData);
                if (resp.data.success == "1") {
                    localStorage.setItem(usertoken, resp.data.token);
                    navigate('/user/dashboard')
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
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12 gap-5">
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
                                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
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
                        <div className="col-span-12">
                            <button disabled={!fname || !password || !email || !gender} onClick={handleRegister} className="bg-primary disabled:bg-gray-600 py-2 px-10 text-white rounded">Submit</button>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterUser