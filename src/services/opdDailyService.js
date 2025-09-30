import axios from "axios";

const getOPDRecordsDaily = async () => {
    try {
        const response = await axios.get( "http://localhost:8080/api/all-patient-record-opd-today"||`${process.env.REACT_APP_API_URL}`);
        return response.data
    } catch (error) {
        console.log("Error fetching data...");
    }
   
} 

export default getOPDRecordsDaily;