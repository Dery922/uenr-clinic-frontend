import axios from "axios"

const url = "http://localhost:8080/departments"

export default fetchdepartments = axios.get(url);
