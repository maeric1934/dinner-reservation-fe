import React from 'react'

const FormField = ({ label, name, type, placeholder, value = '', setUserValue, userData }) => {
  function handleChange(newValue) {
    let updatedUserData = { ...userData };
    updatedUserData[name] = newValue;
    if (setUserValue) {
      setUserValue(updatedUserData);
    }
  }

  return (
    <div className="form-group col">
      <label htmlFor={name}>
        <small className="text-danger"> * </small>
        {label}
      </label>
      <input
        value={value}  // Ensure value is always defined
        type={type}
        onChange={(e) => handleChange(e.target.value)}
        className="form-control"
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;
