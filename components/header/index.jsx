import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getDataUserById } from "stores/actions/user";
import Cookies from "js-cookie";

export default function Navbar() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(getDataUserById(Cookies.get("id")))
      .then((result) => {
        setUser(result.value.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="bg-white shadow-sm w-100 container-fluid py-2">
        <div className="container d-flex justify-content-between">
          <h1 className="header-text">FazzPay</h1>
          <div className="row p-lg-0 m-lg-0 w-auto">
            <div
              className="col-3 ms-2 "
              style={{ height: "70px", width: "70px", position: "relative" }}
            >
              <Image
                src={`${process.env.URL_CLOUDINARY}${user.image}`}
                layout="fill"
                alt=""
              ></Image>
            </div>
            <div className="col-6 col-lg-6 ">
              <h6 className="fw-bold">
                {user?.firstName} {user?.lastName}
              </h6>
              <p className="fw-light">{user?.noTelp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
