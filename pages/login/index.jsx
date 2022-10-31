import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../../stores/actions/signin";
import { getDataUserById } from "../../stores/actions/user";
import { Icon } from "@iconify/react";
export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const handleRegister = () => {
    router.push("/register");
  };

  const handleSubmit = () => {
    dispatch(login(form))
      .then((response) => {
        dispatch(getDataUserById(response.value.data.data.id));
        Cookies.set("token", response.value.data.data.token);
        Cookies.set("userId", response.value.data.data.id);
        // Cookies.set("pin", response.value.data.data.pin);
        alert(response.value.data.msg);
        {
          response.value.data.data.pin === null
            ? router.push("/create-pin")
            : router.push("/home");
        }
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="container-auth">
      <div className="row row-auth">
        <div className="col-md-7 col-sm-12 container-image d-flex justify-content-center align-items-center">
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
        <div className="col-md-5 col-sm-12 container-text d-flex justify-content-start align-items-center">
          <header className="right-side">
            <div className="container-auth-right">
              <h1 className="title-auth-right">
                Start Accessing Banking Needs <br /> With All Devices and All
                Platforms <br /> With 30.000+ Users
              </h1>
              <p className="text-auth-right">
                Transfering money is eassier than ever, you can access <br />{" "}
                FazzPay wherever you are. Desktop, laptop, mobile phone?
                <br /> we cover all of that for you!
              </p>
            </div>
            <form className="auth-form">
              <div className="auth-icon">
                {" "}
                <Icon icon="ci:mail" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter your e-mail"
                onChange={handleChangeText}
              />
              <br />
              <div className="auth-icon">
                {" "}
                <Icon icon="bx:lock-alt" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChangeText}
              />
              <br />
            </form>
            <div className="d-flex justify-content-end">
              <button className="click-me">Forgot password?</button>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-secondary in-button"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            <h4 className="d-flex justify-content-center account-check">
              Dont have an account? Lets{" "}
              <button className="click-me" onClick={handleRegister}>
                Sign Up
              </button>
            </h4>
          </header>
        </div>
      </div>
    </main>
  );
}
