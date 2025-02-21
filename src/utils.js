// export const BASE_URL = `https://localhost:5900/`;
// export const API_URL = `https://localhost:5900/api/v1/`;


export const BASE_URL = "https://surajsujanmatrimony.in:5900/";
export const API_URL = "https://surajsujanmatrimony.in:5900/api/v1/";
export const usertoken = "matrimonialy_user";
// export const API_URL  = `https://surajsujanmatrimony.in:5900/api/v1/`;
export const convertoDDMMYY = (dateString) => {
    if (!dateString) return ''; // Handle empty/null values
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};