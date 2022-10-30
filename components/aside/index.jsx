import React from "react";
import { Icon } from "@iconify/react";
import ModalTopUp from "components/modal";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Aside() {
  const router = useRouter();

  const handleNavigate = (nav) => {
    router.push(`/${nav}`);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    router.push("/login");
  };
  return (
    <>
      <div className="container aside-container">
        <button
          className="d-flex justify-content-center align-items-center aside-container-button"
          onClick={() => handleNavigate("/home")}
        >
          <Icon icon={"iwwa:dashboard"} width="28" />
          <h1 className="aside-text-icon">Dashboard</h1>
        </button>
        <br />
        <button
          className="d-flex justify-content-center align-items-center aside-container-button"
          onClick={() => handleNavigate("/search-receiver")}
        >
          <Icon icon={"bx:up-arrow-alt"} width="28" />
          <h1 className="aside-text-icon">Transfer</h1>
        </button>
        <br />
        <ModalTopUp />
        <br />
        <br />
        <button className="d-flex justify-content-center align-items-center aside-container-button">
          <Icon icon={"ant-design:user-outlined"} width="28" />
          <h1 className="aside-text-icon">Profile</h1>
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button className="d-flex justify-content-center align-items-center aside-container-button">
          <Icon icon={"material-symbols:logout"} width="28" />
          <h1 className="aside-text-icon" onClick={handleLogout}>
            Logout
          </h1>
        </button>
      </div>
    </>
  );
}
