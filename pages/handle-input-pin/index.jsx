import React, { useState } from "react";

export default function HandleInputPin() {
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const handleChange = (e) => {
    setPin({ ...pin, [e.target.id]: e.target.value });
  };

  const inputFocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    console.log(allPin);
  };

  return (
    <div className="text-center container">
      <h1>Handle Input Pin</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-2 justify-content-center">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item}>
              <input
                type="text"
                maxLength="1"
                autoComplete="off"
                className="form-control text-center"
                style={{ width: "40px" }}
                tabIndex={item}
                id={`pin${item}`}
                value={pin[`pin${item}`]}
                onChange={handleChange}
                onKeyUp={inputFocus}
              />
            </div>
          ))}
        </div>
        <div className="d-grid my-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// Reference : https://medium.com/@ahmedaffan311/otp-input-in-react-js-3b36ed67e360
