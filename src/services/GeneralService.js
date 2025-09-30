import axios from "axios"

const pendingAppointment = async () => {
   try {
    const resutls = await axios.get( "http://localhost:8080/api/pending-appointments"||`${process.env.REACT_APP_API_URL}`);
    return resutls.data;
   } catch (error) {
    console.log("Error in getting appointments")
   }
}

export {pendingAppointment}