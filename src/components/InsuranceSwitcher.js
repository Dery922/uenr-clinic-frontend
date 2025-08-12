import { useFormikContext } from "formik"
import { use, useEffect } from "react"

const InsuranceSwitcher = ({setIsInsurance}) => {
   const {values} = useFormikContext();

   useEffect(() => {
      if(values.insurance === "yes"){
         setIsInsurance(true);
      }else{
        setIsInsurance(false);
      }
   })
}

export default InsuranceSwitcher;