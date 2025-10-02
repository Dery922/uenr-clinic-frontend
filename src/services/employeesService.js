import axios from "axios"
import api from "./api";

const EmployeeService = async () => {
    
      try {
        const getAllEmployees = await api.get( "/api/getEmployees");
        return getAllEmployees.data
      } catch (error) {
        console.log(error)
      }
    
}

export { EmployeeService}