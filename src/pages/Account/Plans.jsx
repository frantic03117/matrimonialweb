import axios from 'axios';
import React from 'react'
import { API_URL, usertoken } from '../../utils';
import Loading from '../../components/Loading';

const Plans = () => {
    const [subs, setSubs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const token = localStorage.getItem(usertoken);
    const purchaseSubscription = async (id) => {
        const resp = await axios.post(API_URL + "cart", { id, request_from: "Web" }, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        window.open(resp.data.url);
    }
    const getsubs = async () => {
        try {
            setLoading(true)
            const items = await axios.get(API_URL + "subscription");
            setSubs(items.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        getsubs();
    }, []);
    return (
        <>
            <section className='relative'>
                {
                    loading && (
                        <>
                            <Loading height={'h-lvh'} />
                        </>
                    )
                }
                <div className="container">
                    <div className="grid grid-cols-12 gap-4">
                        {
                            subs.map(itm => (
                                <>


                                    <div className="lg:col-span-6 col-span-12" >
                                        <div className="w-full px-5   ">
                                            <div className="w-full">


                                                <div className="subscription_header flex justify-center">
                                                    <div className="mx-auto py-2 w-56 text-center px-6 text-lg   rounded-t-xl uppercase subscription_title bg-primary text-white">
                                                        <span>{itm.title}</span>
                                                    </div>
                                                </div>
                                                <div className="subscription_body bg-white p-8">
                                                    <div dangerouslySetInnerHTML={{ __html: itm.description }} />
                                                    <div className="w-full mt-5 pb-4 text-center">
                                                        <h2 className="text-3xl pricesubscription font-bold text-primary">
                                                            ₹  {itm.amount}
                                                        </h2>
                                                        <p>
                                                            {
                                                                itm.validity_days == "365" && "Per Year"
                                                            }
                                                            {
                                                                itm.validity_days == "30" && "Per Month"
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="subcription_buttons relative -top-10 flex items-center">
                                                    <button onClick={() => purchaseSubscription(itm._id)} className="size-20  animate-bounce text-white mx-auto relative rounded-full button_1 bg-primary">
                                                        Buy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Plans
