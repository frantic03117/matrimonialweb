import axios from 'axios';
import React from 'react'
import { API_URL, usertoken } from '../../utils';

const PaymentResponse = () => {
    const [cart, setCart] = React.useState({});
    const token = localStorage.getItem(usertoken);
    const { id } = req.params;
    const getcart = async () => {
        const item = await axios.get(API_URL + "cart/show/" + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setCart(item.data.data);
    }
    React.useEffect(() => {
        getcart();
    }, []);
    return (
        <>
            {JSON.stringify(cart)}
        </>
    )
}

export default PaymentResponse
