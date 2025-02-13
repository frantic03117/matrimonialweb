import React from 'react'
import BlogBox from './BlogBox'
import axios from 'axios';
import { API_URL } from '../../utils';

const Blogs = () => {
    const [items, setItems] = React.useState([]);

    const getitems = async () => {
        const resp = await axios.get(API_URL + "blog");
        setItems(resp.data.data);
    }
    React.useEffect(() => {
        getitems();
        console.log(items)
    }, []);
    return (
        <>
            <section className='py-10'>
                <div className="container">
                    <div className="grid grid-cols-12 gap-5">
                        {
                            items.map(itm => (
                                <>
                                    <div className="col-span-4">
                                        <BlogBox data={itm} />
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

export default Blogs