import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Layout from "layout";
import ModalTopUp from "components/modal";
// import { getDataUserById } from "../../stores/actions/user";

export default function Home() {
  const router = useRouter();
  const handleNavigate = (nav) => {
    router.push(`/${nav}`);
  };
  const user = useSelector((state) => state.user);

  return (
    <Layout title="Home">
      <div className="container home-container">
        <div className="row">
          <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
            <header className="dashboard-up">
              <h4 className="home-text">Balance</h4>
              <h1 className="home-number">Rp.{user.data.balance}</h1>
              <br />
              <h4 className="home-text">{user.data.noTelp}</h4>
            </header>
          </div>
          <div className="col-md-5 col-sm-12 d-flex justify-content-center align-items-center">
            <header>
              <button
                type="button"
                className="btn btn-primary dashboard-button"
                onClick={() => handleNavigate("/search-receiver")}
                // data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <Icon icon={"bx:up-arrow-alt"} width="28" /> Transfer
              </button>
              {/* <div
                className="modal fade"
                id="staticBackdrop"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Modal Title
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              <br />
              <br />
              <ModalTopUp />
            </header>
          </div>
        </div>
      </div>
    </Layout>
  );
}
