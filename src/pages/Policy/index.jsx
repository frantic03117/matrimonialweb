import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../utils';

const AppPolicy = () => {
    const [loading, setLoading] = React.useState(false);
    const { url } = useParams();
    const [policies, setPolicies] = React.useState({ title: "", description: "" });
    const getdata = async () => {
        setLoading(true);
        const resp = await axios.get(API_URL + 'policy/show/' + url);
        setPolicies(resp.data.data);
        setLoading(false);
    }

    React.useEffect(() => {
        getdata();
    }, [url]);

    return (
        <>
            {
                (!loading && policies?.description) && (
                    <>

                        <section className='py-10'>
                            <div className="container mx-auto">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-10">
                                        <div className="w-full p-5 bg-blue-gray-100/50 rounded shadow shadow-black">
                                            <div dangerouslySetInnerHTML={{ __html: policies?.description }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default AppPolicy
