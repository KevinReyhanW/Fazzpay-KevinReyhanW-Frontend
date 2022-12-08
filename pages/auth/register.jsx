import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../stores/actions/signup";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleLogin = () => {
    router.push("/auth/login");
  };
  const handleSubmit = () => {
    dispatch(register(form))
      .then((response) => {
        toast.success(response.value.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push("/auth/login");
      })
      .catch((error) => {
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
                <Icon icon="bx:user" />
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your firstname"
                onChange={handleChangeText}
              />
              <br />
              <div className="auth-icon">
                {" "}
                <Icon icon="bx:user" />
              </div>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your lastname"
                onChange={handleChangeText}
              />
              <br />
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
                placeholder="Create your password"
                onChange={handleChangeText}
              />
              <br />
            </form>
            <div className="d-grid">
              <button
                className="btn btn-secondary in-button"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
            <h4 className="d-flex justify-content-center account-check">
              Already have an account? Lets{" "}
              <button className="click-me" onClick={handleLogin}>
                Login
              </button>
            </h4>
          </header>
        </div>
        <ToastContainer />
      </div>
    </main>
  );
}
