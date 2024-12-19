import React from 'react'
import ContactForm from '../Home/ContactForm'
import { useUser } from '../Account/UserContext'
import { IoIosCall, IoMdMail, IoMdPaperPlane } from 'react-icons/io';

const Contact = () => {
    const { policies } = useUser();
    return (
        <>
            <section className='relative contactPage bg-yellow-100/20 z-[1] py-20 '>
                <div className="container relative z-20">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-6">
                            <div className="w-full">
                                <h2 className="section_title">Feel Free  <br></br> to Contact us</h2>
                            </div>
                            <div className="w-full flex items-center gap-3 flex-wrap  mt-5">
                                <div className="size-20">
                                    <span className="rounded-full bg-primary text-white inline-flex items-center justify-center  text-3xl  size-full ">
                                        <IoMdPaperPlane />
                                    </span>
                                </div>
                                <div className='w-[calc(100%-6rem)] text-wrap block' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "address")?.description }} />
                            </div>
                            <div className="w-full flex items-center gap-3 flex-wrap  mt-5">
                                <div className="size-20">
                                    <span className="rounded-full bg-primary text-white inline-flex items-center justify-center  text-3xl  size-full ">
                                        <IoIosCall />
                                    </span>
                                </div>
                                <div className='w-[calc(100%-6rem)] text-wrap block' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "mobile")?.description }} />
                            </div>
                            <div className="w-full flex items-center gap-3 flex-wrap  mt-5">
                                <div className="size-20">
                                    <span className="rounded-full bg-primary text-white inline-flex items-center justify-center  text-3xl  size-full ">
                                        <IoMdMail />
                                    </span>
                                </div>
                                <div className='w-[calc(100%-6rem)] text-wrap block' dangerouslySetInnerHTML={{ __html: policies.find(itm => itm.url == "email")?.description }} />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="w-full rounded-lg bg-white overflow-hidden shadow-sm shadow-primary">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
