import React from 'react'

const SentUserBox = ({ userdata }) => {
    return (
        <>
            <div className="w-full relative  overflow-hidden">
                <>

                    <div className="w-full p-5 rounded-xl shadow-sm shadow-gray-600 bg-white">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-2">
                                <img src={profileimage} alt="" className=" size-32 rounded-xl" />
                            </div>
                            <div className="col-span-10 relative">
                                <div className="w-full relative">
                                    {
                                        userdata?.favourite ? (
                                            <>

                                                <button onClick={() => handleWishlist(userdata?._id)} className='absolute end-4 top-0 text-red-500 opacity-[0.7]'>
                                                    <HeartFilled />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleWishlist(userdata?._id)} className='absolute end-4 top-0 opacity-[0.7]'>
                                                    <HeartOutlined />
                                                </button>
                                            </>
                                        )
                                    }

                                    <h4 className='text-primary text-lg font-bold'>{userdata.name} {userdata.last_name ?? ""}</h4>
                                    <ul className='list-disc font-light flex gap-5 list-inside text-primary'>
                                        <li>
                                            <strong>City </strong> <span>{userdata.city?.title ?? "NA"}</span>
                                        </li>
                                        <li>
                                            <strong>Age </strong> <span>{calculateAge(userdata?.date_of_birth ?? "1990-01-01")}</span>
                                        </li>
                                        <li>
                                            <strong>Height </strong> <span>{userdata?.height}</span>
                                        </li>
                                        <li>
                                            <strong>Job </strong> <span>{userdata?.occupation?.title}</span>
                                        </li>
                                    </ul>
                                    <div className="w-full py-3 text-end">
                                        {
                                            (userdata?.interest && userdata?.interest?._id) ? (
                                                <>
                                                    {
                                                        userdata?.interest?.stauts == "pending" && (
                                                            <>
                                                                <span className="absolute text-center top-[-10px] end-[-43px] inline-block rotate-45 text-nowrap px-3 py-1 bg-amber-700 text-white text-xs rounded">Pending</span>
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => sendInsterest(userdata._id)} className='text-green-500 border border-green-500 px-5 py-2 rounded text-xs'>Send Interest</button>
                                                </>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            </div>
        </>
    )
}

export default SentUserBox
