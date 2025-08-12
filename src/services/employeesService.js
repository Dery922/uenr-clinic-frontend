import axios from "axios"

const EmployeeService = async () => {
    
      try {
        const getAllEmployees = await axios.get("http://localhost:8080/api/getEmployees");
        return getAllEmployees.data
      } catch (error) {
        console.log(error)
      }
    
}

export { EmployeeService}