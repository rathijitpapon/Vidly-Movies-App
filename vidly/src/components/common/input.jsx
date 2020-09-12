import React from 'react';

const Input = ({ name, label, value, type, error, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                value={value} 
                onChange={onChange}
                id={name} 
                name={name}
                type={type} 
                className="form-control"
            />
            { error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default Input;