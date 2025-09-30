import axios from "axios"

const EmployeeService = async () => {
    
      try {
        const getAllEmployees = await axios.get( "http://localhost:8080/api/getEmployees"||`${process.env.REACT_APP_API_URL}`);
        return getAllEmployees.data
      } catch (error) {
        console.log(error)
      }
    
}

export { EmployeeService}