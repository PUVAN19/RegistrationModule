import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelect({
    label = "Date of Birth",
    value,
    onChange,
    required = false
}) {
    return (
        <div className="form-field">
            <label className="form-label">
                {label}
                {required && <span className="required-mark">*</span>}
            </label>

            <DatePicker
                selected={value || null}
                onChange={onChange}
                dateFormat="dd-MMM-yyyy"
                placeholderText="Select date of birth"

                showMonthDropdown
                showYearDropdown
                dropdownMode="select"

                scrollableYearDropdown
                yearDropdownItemNumber={100}

                maxDate={new Date()}

                showPopperArrow={false}

                className="form-control date-picker-input"
                wrapperClassName="date-picker-wrapper"
                popperClassName="date-picker-popper"
            />
        </div>
    );
}

export default DateSelect;