import axios from "axios";
import api from "./api";

const patientService = async () => {
    try {
        
        const response = await api.get( "/api/getPatients");
        return response.data || []
    } catch (error) {
        console.log("Error fetching data...")
    }
   
}


export default patientService;