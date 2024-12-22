import React from 'react'
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { useUser } from '../Account/UserContext';

const Faqs = () => {
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const {faqs} = useUser();
    return (
        <>
            <section className='py-[2rem]'>
                <div className="container">
                    <div className="grid grid-cols-12  items-center">
                        <div className="col-span-12 ">
                            <div className="w-full">
                                <h2 >
                                    <span className="lg:text-3xl text-xl section_title relative font-bold text-gradient">Faqs</span>
                                </h2>
                            </div>
                        </div>
                        <div className="col-span-2"></div>

                        <div className="lg:col-span-8 col-span-12">
                            <div className="w-full p-5">
                                {
                                    faqs.map((itm, index) => (
                                        <>
                                            <div className="w-full cursor-pointer rounded border hover:border-primary faqbg mb-2 shadow-inner  ">
                                                <div onClick={() => handleOpen(index)} className="f_header p-5 w-full ">
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-9">
                                                            <h4 className={`lg:text-xl  text-md font-bold ${open == index ? 'text-primary' : 'text-gray-400'} `}>
                                                                {itm.question}
                                                            </h4>
                                                        </div>
                                                        <div className="col-span-3 ">
                                                            <div className="flex justify-end text-primary ">
                                                                {
                                                                    open == index ? (
                                                                        <span>
                                                                            <SlArrowUp />
                                                                        </span>
                                                                    )
                                                                        : (
                                                                            <span>
                                                                                <SlArrowDown />
                                                                            </span>
                                                                        )
                                                                }

                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                                <div className={`f_body transition-all text-justify duration-1000 *:text-primary px-5 pb-5 ${open == index ? 'block' : 'hidden'}`}>

                                                    <p className='lg:text-md text-sm'>
                                                  <div  dangerouslySetInnerHTML={{ __html: itm.answer }} ></div>
                                                    </p>


                                                </div>
                                            </div>

                                        </>
                                    ))
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default Faqs