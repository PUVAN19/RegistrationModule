function FormInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    maxLength
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

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                className="form-control"
            />

        </div>
    );
}

export default FormInput;