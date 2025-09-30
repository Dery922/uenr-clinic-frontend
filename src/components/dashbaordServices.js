import axios from "axios";

const allUsersService = async () => {
    
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}` || "http://localhost:8080/api/dashboard/all-users");
            return response.data;
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    
}

const allPatientsService = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}` || "http://localhost:8080/api/dashboard/all-patients");
        return response.data
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}
const allPatientsStudentService = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}` || "http://localhost:8080/api/dashboard/all-patients-students");
        return response.data
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

const allOutPatientsService = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}` || "http://localhost:8080/api/dashboard/all-out-patients");
        return response.data
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

const barChartPatient = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}` || "http://localhost:8080/api/patients/monthly-patient-stats");
          return res.data

      } catch (err) {
        console.error("Failed to fetch patient stats:", err.message);
      }
}

const genderPieChartService = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}` || "http://localhost:8080/api/patients/gender-distribution");
        const pieData = [
          { name: "Male", value: res.data.male },
          { name: "Female", value: res.data.female },
        ];
         return pieData;
         console.log(pieData)
      } catch (error) {
        console.error("Failed to fetch gender data", error);
      }
}



export {genderPieChartService,barChartPatient,allUsersService, allOutPatientsService,allPatientsService, allPatientsStudentService}