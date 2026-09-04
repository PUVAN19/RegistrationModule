import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelect({
    label = "Date of Birth",
    value,
    onChange,
    required = false
}) {
    const selectedDate =
        value instanceof Date && !isNaN(value.getTime())
            ? value
            : null;

    return (
        <div className="form-field date-select-field">

            <label className="form-label">
                {label}
                {required && (
                    <span className="required-mark">*</span>
                )}
            </label>

            <DatePicker
                selected={selectedDate}
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

                popperPlacement="bottom-start"
                popperClassName="date-picker-popper"

                readOnly

                portalId="datepicker-portal"
            />

        </div>
    );
}

export default DateSelect;