import axios from "axios";
import api from "./api";

const patientPrescription = async () => {
    try {
        const resp = await api.get("/api/all-patients-prescription");
        return resp.data || []
    } catch (error) {
        console.log(error)
    }
}

export default patientPrescription