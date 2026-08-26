function FormSelect({
    label,
    name,
    value,
    onChange,
    options,
    placeholder,
    required = false
}) {
    return (
        <div>

            <label
                htmlFor={name}
                className="form-label"
            >
                {label}

                {required && (
                    <span className="text-danger ms-1">
                        *
                    </span>
                )}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="form-select"
            >

                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}

            </select>

        </div>
    );
}

export default FormSelect;