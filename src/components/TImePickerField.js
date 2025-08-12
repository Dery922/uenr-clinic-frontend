import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import TimePickerField from './TimePickerField';

// In your Formik form:

const TimePickerField = ({ ...props}) => {
      const { setFieldValue } = useFormikContext(); // allows setting value
      const [field] = useField(props); // gets name, value, onBlur
    
    return(
      <DatePicker 
      {...props}
      {...field}
      selected={field.value}
      onChange={(val) => setFieldValue(field.name, val)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
        
      />
    ) 
}

export default TimePickerField