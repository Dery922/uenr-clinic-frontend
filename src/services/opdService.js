import axios from "axios";
import api from "./api";

const patientOPDService = async () => {
    try {
        const response = await api.get("/api/getPatients/opd-records");
        return response.data || []
    } catch (error) {
        console.log("Error fetching data...")
    }
   
}

export default patientOPDService;