import React, { useState } from "react";
import "../App.css";

const Formedit = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Add validation rules here

    if (!rest.name) {
      errors.name = <div className="text-danger">Name is required</div>
    }

    if (!rest.email) {
      errors.email = <div className="text-danger">Email is required</div>;
    } else if (!/\S+@\S+\.\S+/.test(rest.email)) {
      errors.email = <div className="text-warning">Invalid email format</div>
    }

    if (!rest.mobile) {
      errors.mobile = <div className="text-danger">Mobile is required</div>
    } else if (isNaN(rest.mobile)) {
      errors.mobile = <div className="text-warning">Mobile must be a number</div>
    }

    if (!rest.password) {
      errors.password = <div className="text-danger"> Password is required</div>
    }

    setFormErrors(errors);

    // Return true if the form is valid (no errors), false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // If the form is valid, call the handleSubmit function
      handleSubmit();
    }
  };

  return (
    <>
      <div className="addcontainer">
        <form onSubmit={handleFormSubmit}>
          <div className="close-btn" onClick={handleClose}>
            *
          </div>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleOnChange}
            value={rest.name}
          />
          {formErrors.name && <div className="error">{formErrors.name}</div>}
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleOnChange}
            value={rest.email}
          />
          {formErrors.email && <div className="error">{formErrors.email}</div>}
          <br />

          <label htmlFor="mobile">Mobile:</label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            onChange={handleOnChange}
            value={rest.mobile}
          />
          {formErrors.mobile && <div className="error">{formErrors.mobile}</div>}
          <br />

          <label htmlFor="password">Password:</label>
          <input
            placeholder="please provide min- 5 characters"
            type="password"
            id="password"
            name="password"
            onChange={handleOnChange}
            value={rest.password}
          />
          {formErrors.password && <div className="error">{formErrors.password}</div>}
          <br />

          <button className="btn">SUBMIT</button>
        </form>
      </div>
    </>
  );
};

export default Formedit;
