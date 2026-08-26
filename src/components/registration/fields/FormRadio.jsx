function FormRadio({
    label,
    name,
    value,
    checked,
    onChange
}) {
    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                id={`${name}-${value}`}
            />

            <label
                className="form-check-label"
                htmlFor={`${name}-${value}`}
            >
                {label}
            </label>
        </div>
    );
}

export default FormRadio;