import axios from "axios";

const patientOPDService = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/getPatients/opd-records");
        return response.data || []
    } catch (error) {
        console.log("Error fetching data...")
    }
   
}

export default patientOPDService;