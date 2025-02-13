import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import { API_URL, BASE_URL } from '../../utils';

const SingleBlog = () => {
    const { url } = useParams();
    const [item, setItem] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const getitems = async () => {
        setLoading(true);
        const resp = await axios.get(API_URL + "blog?url=" + url);
        setItem(resp.data.data[0]);
        if (resp.data.success == "1") {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        getitems();
    }, []);
    return (
        <>
            {
                loading ? (
                    <>

                    </>
                ) : (
                    <>
                        <section>
                            <div className="w-full">
                                <img src={BASE_URL + item.banner} alt="" className="w-full h-80 object-cover" />
                            </div>
                            <div className="container">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-1"></div>
                                    <div className="col-span-10">
                                        <div className="w-full p-4 contentData">
                                        <div dangerouslySetInnerHTML={{ __html: item?.content }} />
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

export default SingleBlog