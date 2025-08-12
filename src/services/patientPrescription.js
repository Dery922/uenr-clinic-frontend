import axios from "axios";

const patientPrescription = async () => {
    try {
        const resp = await axios.get("http://localhost:8080/api/all-patients-prescription");
        return resp.data || []
        // console.log(resp.plans)
        // console.log(resp.assessment)
        console.log(resp)
    } catch (error) {
        console.log(error)
    }
}

export default patientPrescription