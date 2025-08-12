import axios from "axios";

const getDoctors = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/getDoctors");
        return response.data
    } catch (error) {
        console.log("Error fetching data...")
    }
   
}

export default getDoctors;