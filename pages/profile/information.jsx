import React from "react";
import Layout from "layout/main";
import { useSelector } from "react-redux";
// import { useRouter } from "next/router";

export default function Info() {
  //   const router = useRouter();

  const user = useSelector((state) => state.user);
  const { data } = user;
  console.log(data.firstName);

  return (
    <Layout>
      <div
        className="bg-white rounder shadow p-3 pb-5 overflow-auto text-start "
        style={{ height: "100vh", maxHeight: "inherit", position: "" }}
      >
        <h4 className="fw-bold">Personal Information</h4>
        <h6 className="text-black-50 mt-4 w-50">
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </h6>
        <div className="mt-5 text-">
          <div className="shadow-sm p-2 rounder ps-3">
            <span className="text-black-50">First Name</span>
            <h4 className="mt-2">{data.firstName}</h4>
          </div>

          <div className="shadow-sm p-2 rounder ps-3 mt-4">
            <span className="text-black-50">Last Name</span>
            <h4 className="mt-2">{data.lastName}</h4>
          </div>

          <div className="shadow-sm p-2 rounder ps-3 mt-4">
            <span className="text-black-50">Verified E-mail</span>
            <h4 className="mt-2">{data.email}</h4>
          </div>

          <div className="d-flex justify-content-between shadow-sm p-2 rounder ps-3 mt-4">
            <div className="">
              <span className="text-black-50">Phone Number</span>
              <h4 className="mt-2">{data.noTelp}</h4>
            </div>
            <div className="mt-3 me-3"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
