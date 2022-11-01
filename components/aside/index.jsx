import React from "react";
import { Icon } from "@iconify/react";
import ModalTopUp from "components/modal";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/actions/logout";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Aside() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleNavigate = (nav) => {
    router.push(`/${nav}`);
  };

  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      alert(response.value.data.msg);
      Cookies.remove("token");
      Cookies.remove("userId");
      localStorage.clear();
      router.push("/");
    });
  };
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 rounded 3 mb-3 bg-white text-white shadow aside">
            <div className="row py-3 px-3 d-flex flex-column justify-content-between h-100">
              <div>
                <button
                  className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn"
                  onClick={() => handleNavigate("/home")}
                >
                  <Icon icon={"iwwa:dashboard"} width="28" />
                  <h5 className="ms-3 mt-1">Dashboard</h5>
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn"
                  onClick={() => handleNavigate("/search-receiver")}
                >
                  <Icon icon={"bi:arrow-up"} width="28" />
                  <h5 className="ms-3 mt-1">Transfer</h5>
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <Icon icon={"akar-icons:plus"} width="28" />
                  <h5 className="ms-3 mt-1">Top Up</h5>
                  <ModalTopUp />
                </button>
                <button className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn">
                  <Icon icon={"ant-design:user-outlined"} width="28" />
                  <h5 className="ms-3 mt-1">Profile</h5>
                </button>
              </div>
              <button className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn-logout">
                <Icon icon={"material-symbols:logout"} width="28" />
                <h5 className="ms-3 mt-1" onClick={handleLogout}>
                  Logout
                </h5>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
