import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL, usertoken } from "../../utils";
import PropTypes from 'prop-types';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    // const navigate = useNavigate();
    const [user, setUser] = useState({ filledFieldsCount: 0, totalColumns: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [policies, setPolicies] = useState([]);
    const [banners, setBanners] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const fetchfaqs = async () => {
        try{
            const items = await axios.get(API_URL + "faq");
            setFaqs(items.data.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    const fetchUser = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem(usertoken);
            const response = await axios.get(API_URL + 'user/all?id=self', {
                headers: {
                    Authorization: "Bearer " + token
                }
            }); // Replace with your API endpoint

            const userData = response.data.data[0];
            setUser(userData);
        } catch (err) {
            userLogout();
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchBanners = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL + 'banner?type=home_web');
            setBanners(response.data.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    const fetchpolicies = async () => {
        try {
            setLoading(true);
            const items = await axios.get(API_URL + "policy");
            setPolicies(items.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    const userLogout = () => {
        localStorage.clear();
        // navigate('/');
    }
    useEffect(() => {
        fetchfaqs();
        fetchpolicies();
        fetchUser();
        fetchBanners();
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, loading, error, fetchUser, userLogout, policies, banners, faqs }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};