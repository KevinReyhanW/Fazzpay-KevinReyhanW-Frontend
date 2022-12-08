import React from "react";
import Head from "next/head";
import Header from "components/header";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "stores/actions/logout";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@iconify/react";
import ModalTopUp from "components/modal";
import Footer from "components/footer";

export default function MainLayout(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavigate = (nav) => {
    router.push(`/${nav}`);
  };

  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      toast.success(response.value.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        Cookies.remove("token");
        Cookies.remove("id");
        localStorage.clear();
        router.push("/");
      }, 3000);
    });
  };
  return (
    <>
      <Head>
        <title>{props.head}</title>
      </Head>

      <div className="bgSecondary m-0 p-0 ">
        <div className="d-none d-lg-block">
          <Header />
        </div>
        <div className="container-fluid d-flex my-lg-5 m-0 p-0">
          <div className="container row mx-auto m-0 p-0 bg-color">
            <div
              className="col-2  d-none d-lg-flex bg-white shadow rounder pt-5 align-items-start p-0"
              style={{ position: "relative" }}
            >
              <div
                className="nav flex-column nav-pills me-3 "
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn"
                  onClick={() => handleNavigate("/home")}
                >
                  <h5 className="ms-3 mt-1 d-flex flex-row">
                    <Icon icon={"iwwa:dashboard"} width="28" />
                    <p className="ps-2">Dashboard</p>
                  </h5>
                </button>

                <button
                  className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn"
                  onClick={() => handleNavigate("/transfer")}
                >
                  <h5 className="ms-3 mt-1 d-flex flex-row">
                    <Icon icon={"bi:arrow-up"} width="28" />
                    <p className="ps-2">Transfer</p>
                  </h5>
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <ModalTopUp />
                  <h5 className="ms-3 mt-1 d-flex flex-row">
                    <Icon icon={"akar-icons:plus"} width="28" />
                    <p className="ps-1">TopUp</p>
                  </h5>
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn"
                  onClick={() => handleNavigate("/profile")}
                >
                  <h5 className="ms-3 mt-1 d-flex flex-row">
                    <Icon icon={"ant-design:user-outlined"} width="28" />
                    <p className="ps-2">Profile</p>
                  </h5>
                </button>

                <button
                  className="btn btn-primary d-flex align-items-center w-75 justify-content-start mt-3 aside-btn-logout"
                  onClick={handleLogout}
                >
                  <h5 className="ms-3 mt-1 d-flex flex-row">
                    <Icon icon={"material-symbols:logout"} width="28" />
                    <p className="ps-2">Logout</p>
                  </h5>
                </button>
              </div>
            </div>

            <div className="col-12 col-lg-10 d-flex row m-0 p-0 px-lg-3 bg-white">
              {props.children}
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}
