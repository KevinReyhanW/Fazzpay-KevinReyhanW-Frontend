import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPin } from "../../stores/actions/pin";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
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

  const userId = Cookies.get("userId");

  const handleSubmit = (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    dispatch(createPin(userId, { pin: allPin }))
      .then((response) => {
        alert(response.value.data.msg);
        router.push("/home");
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  return (
    <main className="container-auth">
      <div className="row row-auth">
        <div className="container-image col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
          <div className="bg-image">
            <h1 className="title-auth-left">FazzPay</h1>
            <img src="/authphone.png" alt="phone" />
            <div className="text">
              <h1>App that Covering Banking Needs.</h1>
              <p>
                FazzPay is an application that focussing in banking needs for
                all users <br /> in the world. Always updated and always
                following world trends.
                <br /> 5000+ users registered in FazzPay everyday with worldwide{" "}
                <br /> users coverage.
              </p>
            </div>
          </div>
        </div>
        <div className="container-text col-md-5 col-sm-12 d-flex justify-content-start align-items-center">
          <header className="right-side">
            <div className="container-auth-right">
              <h1 className="title-auth-right">
                Secure Your Account, Your Wallet,
                <br /> and Your Data With 6 Digits PIN
                <br /> That You Created Yourself.
              </h1>
              <p className="text-auth-right">
                Create 6 digits pin to secure all your money and your data in
                <br />
                FazzPay app. Keep it secret and dont tell anyone about your
                <br />
                FazzPay account password and the PIN.
              </p>
            </div>
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
                <button type="submit" className="btn btn-secondary in-button">
                  Submit
                </button>
              </div>
            </form>
          </header>
        </div>
      </div>
    </main>
  );
}
