import { useFormikContext } from "formik"
import { use, useEffect } from "react"

const PatientTypesSwitcher = ({setPatientTypes}) => {
   const {values} = useFormikContext();

   useEffect(() => {
      if(values.patient_type === "student"){
         setPatientTypes(true);
      }else{
        setPatientTypes(false);
      }
   })
}

export default PatientTypesSwitcher;