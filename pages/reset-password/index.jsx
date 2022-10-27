import React, { useState } from "react";
import axiosClient from "utils/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async () => {
    try {
      const result = await axiosClient.post("/auth/login", form);
      Cookies.set("token", result.data.data.token);
      Cookies.set("userId", result.data.data.id);
      //   proses kondisi pengecekan pin jika ada akan diarahkan ke home jika tidak ada akan diarahkan ke create pin
      router.push("/home");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
                Did You Forgot Your Password?
                <br /> Dont Worry, You Can Reset Your <br /> Password In a
                Minutes.
              </h1>
              <p className="text-auth-right">
                To reset your password, you must type your e-mail and we
                <br /> will send a link to your email and you will be directed
                to the
                <br /> reset password screens.
              </p>
            </div>
            <form className="auth-form">
              <div className="auth-icon">
                {" "}
                <Icon icon="ci:mail" />
              </div>
              <input
                type="email"
                placeholder="Enter your e-mail"
                onChange={handleChangeText}
              />
              <br />
            </form>
            <div className="d-grid">
              <button
                className="btn btn-secondary in-button"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </header>
        </div>
      </div>
    </main>
  );
}
