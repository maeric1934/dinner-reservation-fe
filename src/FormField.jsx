import React from 'react'

const FormField = ({ label, name, type, placeholder, value, setUserValue, userData }) => {
    function handleChange(newValue){
        let updateUserData = {...userData};
        updateUserData[name] = newValue;
        if(setUserValue){
            setUserValue(updateUserData) 
        }
    }

    return (
      <div className="form-group col">
        <label htmlFor={name}><small className="text-danger"> * </small>{label}</label>
        <input
          value={value}
          type={type}
          onChange={(e) => handleChange(e.target.value )}
          className="form-control"
          id={name}
          name={name}
          placeholder={placeholder}
        />
      </div>
    );
};

export default FormField