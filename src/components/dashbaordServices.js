
import api from "../services/api";

const allUsersService = async () => {
    
        try {
            const response = await api.get("/api/dashboard/all-users");
            return response.data;
          
        } catch (error) {
            console.log(error)
        }
    
}

const allPatientsService = async () => {
    try {
        const response = await api.get( "/api/dashboard/all-patients");
        return response.data

    } catch (error) {
        console.log(error)
    }
}
const allPatientsStudentService = async () => {
    try {
        const response = await api.get( "/all-patients-students");
        return response.data
     
    } catch (error) {
        console.log(error)
    }
}

const allOutPatientsService = async () => {
    try {
        const response = await api.get( "/api/dashboard/all-out-patients");
        return response.data
     
    } catch (error) {
        console.log(error)
    }
}

const barChartPatient = async () => {
    try {
        const res = await api.get( "/api/patients/monthly-patient-stats");
          return res.data

      } catch (err) {
        console.error("Failed to fetch patient stats:", err.message);
      }
}

const genderPieChartService = async () => {
    try {
        const res = await api.get( "/api/patients/gender-distribution");
        const pieData = [
          { name: "Male", value: res.data.male },
          { name: "Female", value: res.data.female },
        ];
         return pieData;
        
      } catch (error) {
        console.error("Failed to fetch gender data", error);
      }
}



export {genderPieChartService,barChartPatient,allUsersService, allOutPatientsService,allPatientsService, allPatientsStudentService}