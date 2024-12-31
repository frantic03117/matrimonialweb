import axios from 'axios';
import React from 'react'
import { Form } from 'react-router-dom'
import { API_URL, BASE_URL, usertoken } from '../../utils';
import { useUser } from './UserContext';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
// import { RxCross1 } from 'react-icons/rx';

const Gallery = () => {
    const { user } = useUser();
    const [file, setfile] = React.useState("");
    const token = localStorage.getItem(usertoken);
    const handleimage = (e) => {
        let selectedFiles = Array.from(e.target.files)
        setfile(selectedFiles)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formd = new FormData();
            // formd.append("images", file);
            // // Append images to form data
            if (file && file.length > 0) {
                file.forEach((file) => {
                    formd.append(`images`, file); // Append each image
                });
            }

            const resp = await axios.post(API_URL + "user/add-images", formd, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            if(resp.data.success == "1"){
                toast.success('Uploaded successfully')
            }


        } catch (err) {
            console.error("Error during upload:", err);
        } finally {
            // Any cleanup or state updates here
        }
    };

    return (
        <div>
            <section>
                <Form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        <div className="col-span-1">
                            <label htmlFor="">Select Image</label>
                            <input
                                type='file'
                                className='form-control'
                                accept="image/*"
                                multiple
                                onChange={(e) => handleimage(e)} />
                        </div>
                        <div className="col-span-1 md:pt-4 pt-0">
                            <button type='submit' className='bg-primary text-white px-4 py-3 text-sm rounded ' >
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            </section>

            <section>
                <div className="flex gap-5 flex-wrap mt-5">
                    {
                        user?.userImages?.map((item) => {
                            return (
                                <>
                                    <div className='bg-white p-2 rounded-full shadow-lg relative'>
                                        <img src={`${BASE_URL}${item.image}`} alt="" className='h-[100px] w-[100px] rounded-full' />
                                        <div className='h-[20px] w-[20px] bg-primary text-white rounded absolute right-[0px] top-[0px] flex items-center justify-center '>
                                            <RxCross1 />
                                        </div>
                                    </div>

                                </>
                            )
                        })
                    }

                </div>
            </section>
        </div>
    )
}

export default Gallery
