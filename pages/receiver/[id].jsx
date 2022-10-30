import Layout from "layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { getDataUserById } from "../../stores/actions/user";
export default function Receiver() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { id } = router.query;
  const imageUser = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${data.image}`;
  console.log(data);
  const getData = () => {
    dispatch(getDataUserById(id))
      .then((response) => {
        setData(response.value.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //BIKIN PROSES TRANSFER (REQUEST BODY)
  //BIKIN PROSES PENGECEKAN JIKA PIN
  //YAALLAH
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout title="home">
      <div className="container receiver-container">
        <div className="row">
          <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
            <header>
              <h1>Transfer Money</h1>
              <br />
              <img
                src={imageUser}
                alt=""
                className="rounded"
                style={{ width: "80px" }}
              ></img>
              <h1>
                {data.firstName} {data.lastName}
                <br />
                {data.noTelp}
              </h1>
              <p>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
              <button
                type="button"
                className="btn btn-primary dashboard-button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <Icon icon={"bx:up-arrow-alt"} width="28" /> Transfer
              </button>
              <div
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
                        Transfer
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <h5>Please add the amount you want to transfer</h5>
                      <input
                        type="text"
                        id="amount"
                        name="amount"
                        className="transfer-input"
                      ></input>
                      <h5>Please confirm your pin to transfer</h5>
                      <input
                        type="text"
                        id="amount"
                        name="amount"
                        className="transfer-input"
                      ></input>
                    </div>
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
              </div>
            </header>
          </div>
        </div>
      </div>
    </Layout>
  );
}
