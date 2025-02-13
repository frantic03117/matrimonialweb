// import Reacttgb  from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../utils'
import PropTypes from 'prop-types';

const BlogBox = ({data}) => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return `${date.toLocaleDateString('en-US', options)}`;
    }
    return (
        <>
            <div className=" w-full h-full">
                <Link to={'/blog/'+data.slug} className=" w-full h-full">
                    <div className="m-2">
                        <div
                            className="p-5 w-full h-full relative rounded-ss-2xl rounded-se-2xl rounded-es-2xl overflow-hidden border border-blue-gray-100">
                            <ul className="flex list-disc gap-6 ps-5 text-sm mb-4 text-blue-gray-500">
                                <li>{formatDate(data.createdAt)}</li>
                                <li>Admin</li>
                            </ul>
                            <figure className="w-full mb-4"><img
                                src={BASE_URL + data.thumbnail} alt=""
                                className="w-full h-[250px] object-cover rounded-2xl" /></figure>
                            <div className="w-full p-3"><span
                                className=" rounded-full px-3 mb-5 text-nowrap hidden bg-blue-gray-800 text-sm text-white">Arbitration</span>
                                <h4 className="text-lg font-bold">{data.title}</h4>
                                <div className="w-full mt-5"><button>Read more..</button></div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default BlogBox

BlogBox.propTypes = {
    data : PropTypes.object
}