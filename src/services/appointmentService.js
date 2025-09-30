import axios from "axios";

const appointmentService = async () => {
    
        try {
            const response = await axios.get("http://localhost:8080/api/getAppointments"||`${process.env.REACT_APP_API_URL}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    
}

export default appointmentService;