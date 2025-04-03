import axios from 'axios';
import React from 'react'
import { API_URL, usertoken } from '../../utils';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { FaRegCheckCircle } from 'react-icons/fa';

const PaymentResponse = () => {
    const [cart, setCart] = React.useState({});
    const token = localStorage.getItem(usertoken);
    const [loading, setLoading] = React.useState(true);
    const { id } = useParams();
    const getcart = async () => {
        try {
            setLoading(true);
            const item = await axios.get(API_URL + "cart/show/" + id, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setCart(item.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }
    React.useEffect(() => {
        getcart();
    }, []);
    return (
        <>
            {
                loading ? (
                    <>
                        <Loading height={'min-h-lvh h-lvh'} />
                    </>
                ) : (
                    <>
                        <div className="container">
                            {
                                cart.payment_status == "SUCCESS" && (
                                    <>
                                        <div className="grid grid-cols-12">
                                            <div className="col-span-3"></div>
                                            <div className="col-span-6">
                                                <div className="message-box shadow-md text-center shadow-primary/50  border-l-2 border-green-400 p-5">
                                                    <span className='text-[7rem] flex justify-center items-center mb-10  text-green-400'>
                                                        <FaRegCheckCircle />
                                                    </span>
                                                    <h2 className='mb-4 cursive font-bold text-3xl'> Your payment was successful </h2>
                                                    <p className='mb-4'> Thank you for your payment
                                                    </p>
                                                    <table className="w-full *:text-sm">
                                                        <tbody>
                                                            <tr className='*:p-2 *:border *:border-primary/2'>
                                                                <td>
                                                                    Amount
                                                                </td>
                                                                <td>
                                                                    {cart.amount}
                                                                </td>
                                                            </tr>
                                                            <tr className='*:p-2 *:border *:border-primary/2'>
                                                                <td>
                                                                    Validity Start On
                                                                </td>
                                                                <td>
                                                                    {cart.validity_start_from.split('T')[0].split('-').reverse().join('-')}
                                                                </td>
                                                            </tr>
                                                            <tr className='*:p-2 *:border *:border-primary/2'>
                                                                <td>
                                                                    Validity Expiring On
                                                                </td>
                                                                <td>
                                                                    {cart.validity_end_to.split('T')[0].split('-').reverse().join('-')}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )
                            }

                            {
                                cart.payment_status != "SUCCESS" && (
                                    <>
                                        <div className="grid grid-cols-12">
                                            <div className="col-span-3"></div>
                                            <div className="col-span-6">
                                                <div className="message-box _success">
                                                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                                                    <h2> Your payment was {cart.payment_status} </h2>
                                                    <p> Thank you for your payment. we will <br />
                                                        be in contact with more details shortly </p>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )
                            }
                        </div>
                    </>
                )
            }


        </>
    )
}

export default PaymentResponse
