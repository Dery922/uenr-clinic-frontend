import axios from "axios";

const appointmentService = async () => {
    
        try {
            const response = await axios.get("http://localhost:8080/api/getAppointments");
            return response.data;
        } catch (error) {
            console.log(error)
        }
    
}

export default appointmentService;