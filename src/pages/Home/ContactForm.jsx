import axios from 'axios';
import React from 'react'
import { API_URL } from '../../utils';

const ContactForm = () => {
    const [fdata, setFdata] = React.useState({ name: "", email: "", mobile: "", message: "" });
    const [msg, setMsg] = React.useState('');
    const [status, setStatus] = React.useState(0);
    const handleFdata = async (e) => {
        setFdata((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }
    const sendQuery = async () => {
        try {
            const resp = await axios.post(API_URL + "user/query", fdata);
            setStatus(resp.data.success);
            setMsg(resp.data.message);

        } catch (err) {
            alert(err);
        } finally {
            setFdata({ name: "", email: "", mobile: "", message: "" })
        }
    }

    return (
        <>

            <div className="w-full  contactform relative lg:p-10 p-4 bg-white/65 backdrop-blur-sm ">
                <h4 className="lg:text-[2rem] text-[1.5rem] text-primary font-bold mb-4">How can we help you?</h4>
                {
                    msg && (
                        <>
                            <div className="form-group mb-3">
                                <div className={`w-full p-2 rounded-md text-sm text-white ${status == "1" ? 'bg-green-500' : "bg-red-500"}`}>
                                    {msg}
                                </div>
                            </div>
                        </>
                    )
                }


                <div className="form-group mb-3">
                    <label htmlFor="">Enter Name</label>
                    <input type="text" name="name" value={fdata?.name} onChange={handleFdata} className="w-full p-2 outline-none  rounded border border-primary/40" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="">Enter Email</label>
                    <input type="text" name="email" value={fdata?.email} onChange={handleFdata} className="w-full p-2 outline-none  rounded border border-primary/40" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="">Enter Mobile</label>
                    <div className="flex gap-2">
                        <span className="inline-flex items-center justify-center bg-white rounded-s size-10 w-16 border border-primary/40">+91</span>
                        <input type="text" name="mobile" value={fdata?.mobile} onChange={handleFdata} className="w-full p-2 outline-none  rounded-e border border-primary/40" />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="">Enter Message</label>
                    <textarea name="message" value={fdata?.message} onChange={handleFdata} rows={4} className="w-full p-2 outline-none  rounded border border-primary/40"></textarea>
                </div>
                <div className="form-group">
                    <button onClick={sendQuery} disabled={!fdata?.name || !fdata?.email || !fdata.mobile} className="bg-primary btn text-white w-full py-3">Submit</button>
                </div>
            </div>
        </>
    )
}

export default ContactForm
