import React, { useState } from 'react'
import { useUser } from './UserContext'
import { Radio } from '@material-tailwind/react';
import axios from 'axios';
import { API_URL, usertoken } from '../../utils';
import Loading from '../../components/Loading';
import { FaCircle } from 'react-icons/fa6';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const UpdateProfile = () => {
    const { user, loading } = useUser();



    console.log("user", user)
    // State to manage error messages
    const [errors, setErrors] = useState({
        name: '',
        last_name: '',
        occupation: '',
        education: '',
        employment: ''
    });
    const [fdata, setFdata] = React.useState({});
    const [mdata, setMdata] = React.useState([]);
    const token = localStorage.getItem(usertoken);
    const [years, setYears] = React.useState([]);
    const [msg, setMsg] = React.useState('');
    const [status, setStatus] = React.useState(0);
    const [showOccupationInput, setShowOccupationInput] = React.useState(false);
    const [showEducationInput, setShowEducationInput] = React.useState(false);
    const [showEmploymentInput, setShowEmploymentInput] = React.useState(false);
    const [dob, setDob] = React.useState(null);
    const handleDob = (value) => {
        setDob(value)
    }
    const getyears = () => {
        const yearsArray = [];

        // Loop through the years from 1975 to the current year
        for (let year = 1975; year <= new Date().getFullYear(); year++) {
            yearsArray.push(year);
        }
        setYears(yearsArray);
    }

    const [isload, setLoad] = React.useState(true);
    const getmdata = async () => {
        try {
            setLoad(true)
            const resp = await axios.get(API_URL + "surajmal/core-values");
            setMdata(resp.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false)
        }
    }
    const [allfields, setAllFields] = React.useState({});
    const getfields = async () => {
        const items = await axios.get(API_URL + "user/all_fields");
        setAllFields(items.data.data);
    }
    React.useEffect(() => {
        getfields();
        getmdata();
        getyears();
    }, []);
    React.useEffect(() => {
        if (allfields && user && !loading) {
            let arr = {}
            // eslint-disable-next-line no-unused-vars
            Object.entries(allfields).map(([k, v]) => {
                if (!['is_deleted', 'is_rejected'].includes(k)) {
                    if (!['city', 'state', 'city', 'gautra_avoided'].includes(k)) {
                        arr[k] = user[k]
                        if (k == "date_of_birth") {
                            setDob(user[k])
                        }
                    } else if (['city', 'state', 'city'].includes(k)) {
                        arr[k] = user[k]?._id
                    } else if (k == "gautra_avoided") {
                        arr[k] = user[k] ? user[k].join(',') : ""
                    }
                }
            });
            user?.education && user?.education.map(edu => {
                arr['completed_year'] = edu.completed_year;
                arr['education'] = edu.education
                return true;
            })
            setFdata(arr);
        }
    }, [allfields, user, loading]);

    const calculateMinDate = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        return today.toISOString().split("T")[0];
    };
    const handleFdata = (e) => {
        const { name, value } = e.target;
        setFdata((prev) => {
            let updatedData = { ...prev, [name]: value };

            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ''
            }));


            if (name === "occupation") {
                if (value === "Other") {
                    setShowOccupationInput(true);
                } else {
                    setShowOccupationInput(false);
                    updatedData["other_occupation"] = "";
                }
            }

            if (name === "education") {
                if (value === "Other") {
                    setShowEducationInput(true);
                } else {
                    setShowEducationInput(false);
                    updatedData["other_education"] = "";
                }
            }

            if (name === "employment") {
                if (value === "Other") {
                    setShowEmploymentInput(true);
                } else {
                    setShowEmploymentInput(false);
                    updatedData["other_employment"] = "";
                }
            }

            if (name === "other_education") {
                updatedData["education"] = value;
            }
            if (name === "other_occupation") {
                updatedData["occupation"] = value;
            }
            if (name === "other_employment") {
                updatedData["employment"] = value;
            }
            // Validation checks for required fields
            const newErrors = {};
            if (!updatedData.name) newErrors.name = 'Name is required';
            if (!updatedData.last_name) newErrors.last_name = 'Last name is required';
            if (!updatedData.email) newErrors.email = 'Email is required';
            if (!updatedData.mobile) newErrors.mobile = 'Mobile is required';
            if (!updatedData.adhar_no) newErrors.adhar_no = 'adhaar no  is required';
            if (!updatedData.gender) newErrors.gender = 'gender is required';
            if (!updatedData.date_of_birth) newErrors.date_of_birth = 'Date of Birth  is required';
            if (!updatedData.fathergautra) newErrors.fathergautra = 'Father Gautra  is required';
            if (!updatedData.mothergautra) newErrors.mothergautra = 'Mother Gautra  is required';
            if (!updatedData.gautra_avoided) newErrors.gautra_avoided = 'Excluded Gautras  is required';
            if (!updatedData.marital_status) newErrors.marital_status = 'Marital Status  is required';
            if (!updatedData.expectation) newErrors.expectation = 'Expectation  is required';
            if (!updatedData.about_me) newErrors.about_me = 'About Me  is required';
            if (!updatedData.about_me) newErrors.about_me = 'About Me  is required';
            if (!updatedData.height) newErrors.height = 'Height  is required';
            if (!updatedData.eye_color) newErrors.eye_color = 'Eye Color  is required';
            if (!updatedData.employment) newErrors.employment = 'Employment  is required';
            if (!updatedData.occupation) newErrors.occupation = 'Occupation  is required';
            if (!updatedData.diet) newErrors.diet = 'Diet  is required';
            if (!updatedData.annual_income) newErrors.annual_income = 'Annual Income  is required';
            if (!updatedData.drink_status) newErrors.drink_status = 'Drink Status  is required';
            if (!updatedData.smoke_status) newErrors.smoke_status = 'Smoke Status  is required';
            if (!updatedData.education) newErrors.education = 'Education  is required';
            if (!updatedData.completed_year) newErrors.completed_year = 'Completed Year  is required';
            if (!updatedData.state) newErrors.state = 'State  is required';
            if (!updatedData.city) newErrors.city = 'City  is required';
            if (!updatedData.pincode) newErrors.pincode = 'Pincode  is required';

            setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));


            return updatedData;
        });
    };





    const updateProfile = async () => {

        try {
            const exclude = ['password', 'date_of_birth'];
            setLoad(true);
            const formd = new FormData();
            Object.entries(fdata).map(([k, v]) => {
                if (!exclude.includes(k)) {
                    formd.append(k, v);
                }
            });
            formd.append('date_of_birth', new Date(dob));

            const itm = await axios.put(API_URL + "user/update", formd, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setStatus(itm.data.success);
            setMsg(itm.data.message);
            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
        } finally {
            setLoad(false)
        }
    }


    return (
        <>
            {
                loading || isload ?
                    (
                        <>
                            <section className="h-screen">
                                <Loading height={'h-screen'} />
                            </section>
                        </>
                    ) : (
                        <>

                            <section>
                                <form onSubmit={updateProfile}>
                                    <div className="container themeform border border-primary/50 p-5 bg-yellow-200/10 backdrop-blur-sm rounded-lg">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                {
                                                    msg && (
                                                        <>
                                                            <div className={`${status == "1" ? 'bg-green-500' : 'bg-red-500'} text-white p-4 text-xs`}>
                                                                {msg}
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className="col-span-12">
                                                <div className="p-2 flex gap-3 items-center text-sm  font-light text-primary bg-primary/20 rounded border-s  border-primary">
                                                    <FaCircle />   User Info
                                                </div>
                                            </div>

                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Enter Name</label>
                                                    <input type="text" name="name" onChange={handleFdata} value={fdata?.name} id="" className="form-control" required />
                                                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Enter Last Name</label>
                                                    <input type="text" name="last_name" onChange={handleFdata} value={fdata?.last_name} id="" className="form-control" required />
                                                    {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Select Gender</label>
                                                    <div className="flex">
                                                        <Radio name='gender' onClick={handleFdata} value={'Male'} checked={fdata?.gender == "Male"} label="Male" required />
                                                        <Radio name='gender' onClick={handleFdata} value={'Female'} checked={fdata?.gender == "Female"} label="Female" required />
                                                    </div>
                                                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Enter Email</label>
                                                    <input type="text" name="email" onChange={handleFdata} value={fdata?.email} id="" className="form-control" required />
                                                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Mobile</label>
                                                    <input type="tel" name="mobile" onChange={handleFdata} value={fdata?.mobile} id="" className="form-control" onInput={(e) => {
                                                        e.target.value = e.target.value.replace(/[^0-9]/g, '');

                                                    }} maxLength="10" required />
                                                    {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Aadhar No</label>

                                                    {
                                                        user.adhar_verify ? (
                                                            <>
                                                                <div className="w-full form-control">
                                                                    {fdata?.adhar_no}
                                                                </div>
                                                            </>
                                                        ) :
                                                            (
                                                                <>
                                                                    <input type="text" name="adhar_no" onChange={handleFdata} value={fdata?.adhar_no} id="" className="form-control" required />
                                                                    {errors.adhar_no && <span className="text-red-500 text-sm">{errors.adhar_no}</span>}

                                                                </>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Enter Date of Birth</label>
                                                    {/* <input
                                                        type="date"
                                                        name="date_of_birth"
                                                        onChange={handleFdata}
                                                        value={fdata?.date_of_birth ? fdata?.date_of_birth.split("T")[0] : ""}
                                                        max={calculateMinDate()}
                                                        id=""
                                                        className="form-control"
                                                        required
                                                    /> */}
                                                    <DatePicker
                                                        selected={dob}
                                                        onChange={handleDob}
                                                        name="date_of_birth"
                                                        dateFormat="dd/MM/yyyy"
                                                        maxDate={new Date(calculateMinDate())}
                                                        placeholderText="DD/MM/yyyy"
                                                        className="form-control text-black"
                                                        required
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        scrollableYearDropdown
                                                        yearDropdownItemNumber={15} />





                                                    {errors.date_of_birth && <span className="text-red-500 text-sm">{errors.date_of_birth}</span>}


                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="p-2 flex gap-3 items-center text-sm  font-light text-primary bg-primary/20 rounded border-s  border-primary">
                                                    <FaCircle />   Social Info
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Father Gautra</label>
                                                    <input type="text" name="fathergautra" onChange={handleFdata} value={fdata?.fathergautra} id="" className="form-control" required />
                                                    {errors.fathergautra && <span className="text-red-500 text-sm">{errors.fathergautra}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Mother Gautra</label>
                                                    <input type="text" name="mothergautra" onChange={handleFdata} value={fdata?.mothergautra} id="" className="form-control" required />
                                                    {errors.mothergautra && <span className="text-red-500 text-sm">{errors.mothergautra}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Excluded Gautras</label>
                                                    <input type="text" name="gautra_avoided" onChange={handleFdata} value={fdata?.gautra_avoided} id="" className="form-control" required />
                                                    {errors.gautra_avoided && <span className="text-red-500 text-sm">{errors.gautra_avoided}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Marital Status</label>
                                                    {/* <input type="text" name="marital_status" onChange={handleFdata} value={fdata?.marital_status} id="" className="form-control" /> */}

                                                    <select onChange={handleFdata} name='marital_status' className="form-control" required>
                                                        <option value="">---Select---</option>
                                                        <option selected={"Single" == fdata?.marital_status} value={"Single"}>{"Single"}</option>
                                                        <option selected={"Widow" == fdata?.marital_status} value={"Widow"}>{"Widow"}</option>
                                                        <option selected={"Divorced" == fdata?.marital_status} value={"Divorced"}>{"Divorced"}</option>
                                                    </select>
                                                    {errors.marital_status && <span className="text-red-500 text-sm">{errors.marital_status}</span>}

                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="p-2 flex gap-3 items-center text-sm  font-light text-primary bg-primary/20 rounded border-s  border-primary">
                                                    <FaCircle />   Personal Info
                                                </div>
                                            </div>
                                            <div className="col-span-6">
                                                <label htmlFor="" className='required'>Expectations</label>
                                                <textarea name="expectation" rows='5' onChange={handleFdata} value={fdata?.expectation} className="form-control" required></textarea>
                                                {errors.expectation && <span className="text-red-500 text-sm">{errors.expectation}</span>}
                                            </div>
                                            <div className="col-span-6">
                                                <label htmlFor="" className='required'>About Me</label>
                                                <textarea name="about_me" rows='5' onChange={handleFdata} value={fdata?.about_me} className="form-control" required></textarea>
                                                {errors.about_me && <span className="text-red-500 text-sm">{errors.about_me}</span>}
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Height <small className='text-red-500'>height in(x.y) feet</small> </label>
                                                    <input type="text" name="height" onChange={handleFdata} value={fdata?.height} id="" className="form-control" required />
                                                    {errors.height && <span className="text-red-500 text-sm">{errors.height}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>eye color</label>
                                                    <input type="text" name="eye_color" onChange={handleFdata} value={fdata?.eye_color} id="" className="form-control" required />
                                                    {errors.eye_color && <span className="text-red-500 text-sm">{errors.eye_color}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Employment</label>
                                                    <select onChange={handleFdata} name='employment' className="form-control" required>
                                                        <option value="">---Select---</option>
                                                        {
                                                            mdata.filter(obj => obj.column_type == "employment").map(itm => (
                                                                <>
                                                                    <option selected={itm.title == fdata.employment} value={itm.title}>{itm.title}</option>
                                                                </>
                                                            ))
                                                        }
                                                    </select>
                                                    {errors.employment && <span className="text-red-500 text-sm">{errors.employment}</span>}
                                                </div>
                                            </div>
                                            {showEmploymentInput && (
                                                <div className="lg:col-span-3 col-span-12">
                                                    <div className="form-group">
                                                        <label htmlFor="employment-input" className='required'>Other Employment</label>
                                                        <input
                                                            type="text"
                                                            name="other_employment"
                                                            className="form-control"
                                                            required
                                                            id="employment-input"
                                                            onChange={handleFdata}

                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Occupation</label>
                                                    <select onChange={handleFdata} name='occupation' className="form-control" required >
                                                        <option value="">---Select---</option>
                                                        {
                                                            mdata.filter(obj => obj.column_type == "occupation").map(itm => (
                                                                <>
                                                                    <option selected={itm.title == fdata.occupation} value={itm.title}>{itm.title}</option>
                                                                </>
                                                            ))
                                                        }
                                                    </select>
                                                    {errors.occupation && <span className="text-red-500 text-sm">{errors.occupation}</span>}
                                                </div>
                                            </div>
                                            {showOccupationInput && (
                                                <div className="lg:col-span-3 col-span-12">
                                                    <div className="form-group">
                                                        <label htmlFor="occupation-input" className='required'>Occupation</label>
                                                        <input
                                                            type="text"
                                                            name="other_occupation"
                                                            className="form-control"
                                                            id="occupation-input"
                                                            onChange={handleFdata}
                                                            required

                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Diet</label>
                                                    <select onChange={handleFdata} name='diet' className="form-control" required>
                                                        <option value="">---Select---</option>
                                                        {
                                                            mdata.filter(obj => obj.column_type == "diet").map(itm => (
                                                                <>
                                                                    <option selected={itm.title == fdata.diet} value={itm.title}>{itm.title}</option>
                                                                </>
                                                            ))
                                                        }
                                                    </select>
                                                    {errors.diet && <span className="text-red-500 text-sm">{errors.diet}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Annual Income</label>
                                                    <input type="text" onChange={handleFdata} name='annual_income' value={fdata?.annual_income} className="form-control" required />
                                                    {errors.annual_income && <span className="text-red-500 text-sm">{errors.annual_income}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Drink </label>
                                                    <select
                                                        name="drink_status"
                                                        id="drink-status"
                                                        onChange={handleFdata}
                                                        value={fdata?.drink_status}
                                                        className="form-control"
                                                        required
                                                    >
                                                        <option value="">---Select---</option>
                                                        <option value="Regularly">Regularly</option>
                                                        <option value="Socially">Occasionally</option>
                                                        <option value="Not at all">Tetotalar</option>
                                                    </select>
                                                    {errors.drink_status && <span className="text-red-500 text-sm">{errors.drink_status}</span>}
                                                </div>
                                            </div>

                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="smoke-status" className='required'>Smoke</label>
                                                    <select
                                                        name="smoke_status"
                                                        id="smoke-status"
                                                        onChange={handleFdata}
                                                        value={fdata?.smoke_status}
                                                        className="form-control"
                                                        required
                                                    >
                                                        <option value="">---Select---</option>
                                                        <option value="Regularly">Regularly</option>
                                                        <option value="Socially">Socially</option>
                                                        <option value="Not at all">Not at all</option>
                                                    </select>
                                                    {errors.smoke_status && <span className="text-red-500 text-sm">{errors.smoke_status}</span>}
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="p-2 flex gap-3 items-center text-sm  font-light text-primary bg-primary/20 rounded border-s  border-primary">
                                                    <FaCircle />   Educational Info
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <label htmlFor="" className='required'>Education</label>
                                                <select onChange={handleFdata} name='education' className="form-control" required>
                                                    <option value="">---Select---</option>
                                                    {
                                                        mdata.filter(obj => obj.column_type == "education").map(itm => (
                                                            <>
                                                                <option selected={itm.title == fdata.education} value={itm.title}>{itm.title}</option>
                                                            </>
                                                        ))
                                                    }
                                                </select>
                                                {errors.education && <span className="text-red-500 text-sm">{errors.education}</span>}
                                            </div>
                                            {showEducationInput && (
                                                <div className="lg:col-span-3 col-span-12">
                                                    <div className="form-group">
                                                        <label htmlFor="education-input" className='required'>Other Education</label>
                                                        <input
                                                            type="text"
                                                            name='other_education'
                                                            className="form-control"
                                                            id="occupation-input"
                                                            onChange={handleFdata}

                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="lg:col-span-3 col-span-12">
                                                <label htmlFor="" className='required'>Completed Year</label>
                                                <select name="education_year" onChange={handleFdata} id="" className="form-control" required>
                                                    <option value="">---Select---</option>
                                                    {
                                                        years.map(itm => (
                                                            <>
                                                                <option selected={fdata?.completed_year == itm} value={itm}>{itm}</option>
                                                            </>
                                                        ))
                                                    }
                                                </select>

                                            </div>

                                            <div className="col-span-12">
                                                <div className="p-2 flex gap-3 items-center text-sm  font-light text-primary bg-primary/20 rounded border-s  border-primary">
                                                    <FaCircle />   Native Address Info
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Select State</label>
                                                    <select onChange={handleFdata} name='state' className="form-control" required >
                                                        <option value="">---Select---</option>
                                                        {
                                                            mdata.filter(obj => obj.column_type == "state").map(itm => (
                                                                <>
                                                                    <option selected={itm._id == fdata.state} value={itm._id}>{itm.title}</option>
                                                                </>
                                                            ))
                                                        }
                                                    </select>
                                                    {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">

                                                    <label htmlFor="" className='required'>Select City</label>

                                                    <select onChange={handleFdata} name='city' className="form-control" required>
                                                        <option value="">---Select---</option>
                                                        {
                                                            mdata.filter(obj => obj.column_type == "city" && obj.parent_id._id == fdata?.state).map(itm => (
                                                                <>
                                                                    <option selected={itm._id == fdata.city} value={itm._id}>{itm.title}</option>
                                                                </>
                                                            ))
                                                        }
                                                    </select>
                                                    {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-3 col-span-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className='required'>Enter Pincode</label>
                                                    <input type="text" onChange={handleFdata} name="pincode" value={fdata?.pincode} id="" className="form-control" required />
                                                    {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode}</span>}
                                                </div>
                                            </div>
                                            <div className="col-span-12 pb-4">
                                                <button className='bg-primary text-white p-3 rounded' >
                                                    Submit
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </section>
                        </>
                    )
            }

        </>
    )
}

export default UpdateProfile
