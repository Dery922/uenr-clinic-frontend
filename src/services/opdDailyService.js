import axios from "axios";
import api from "./api";

const getOPDRecordsDaily = async () => {
    try {
        const response = await api.get( "/api/all-patient-record-opd-today");
        return response.data
    } catch (error) {
        console.log("Error fetching data...");
    }
   
} 

export default getOPDRecordsDaily;