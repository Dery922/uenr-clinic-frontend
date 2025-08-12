import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerField = ({ ...props }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field] = useField(props);

  // Handle date change
  const handleChange = (date) => {
    if (!date) return;
    
    // Convert to date-only string (YYYY-MM-DD)
    const dateOnlyString = date.toISOString().split('T')[0];
    setFieldValue(field.name, dateOnlyString);
  };

  // Parse the current value or use today's date
  const getSelectedDate = () => {
    if (field.value) {
      // Handle both string and Date object inputs
      return typeof field.value === 'string' 
        ? new Date(field.value) 
        : field.value;
    }
    return new Date(); // Default to current date
  };

  // Set initial value if empty
  useEffect(() => {
    if (!field.value) {
      const today = new Date();
      const dateOnlyString = today.toISOString().split('T')[0];
      setFieldValue(field.name, dateOnlyString);
    }
  }, [field.name, field.value, setFieldValue]);

  return (
    <DatePicker
      {...field}
      {...props}
      selected={getSelectedDate()}
      onChange={handleChange}
      className="form-control datetimepicker"
      dateFormat="yyyy-MM-dd"
      todayButton="Today" // Optional: adds a "Today" button
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      isClearable={props.isClearable || false}
    />
  );
};

export default DatePickerField;