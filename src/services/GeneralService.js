import axios from "axios"
import api from "./api";

const pendingAppointment = async () => {
   try {
    const resutls = await api.get( "/api/pending-appointments");
    return resutls.data;
   } catch (error) {
    console.log("Error in getting appointments")
   }
}

export {pendingAppointment}