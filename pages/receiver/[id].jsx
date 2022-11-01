import Layout from "layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { transfer } from "../../stores/actions/transfer";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { getDataUserById } from "../../stores/actions/user";
import { checkPin } from "../../stores/actions/pin";

export default function Receiver() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { id } = router.query;
  const [form, setForm] = useState({
    receiverId: id,
    amount: "",
    notes: "",
  });
  const imageUser = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${data.image}`;

  //NAVBAR BERUBAH KARENA 2X DISPATCH, UBAH DENGAN DISPATCH YANG BERBEDA
  const getData = () => {
    dispatch(getDataUserById(id))
      .then((response) => {
        setData(response.value.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    dispatch(transfer(form))
      .then((response) => {
        alert(response.value.data.msg);
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckPin = () => {
    dispatch(checkPin(pin));
  };
  //BIKIN PROSES PENGECEKAN JIKA PIN
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
                      <h5>Please add the these details before you transfer</h5>
                      <form className="form d-grid">
                        <input
                          type="text"
                          name="receiverId"
                          value={id}
                          disabled
                          onChange={handleChangeText}
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          name="amount"
                          placeholder="Please add the amount of money you want to transfer"
                          onChange={handleChangeText}
                        />
                        <br />
                        <br />
                        <input
                          type="text"
                          name="notes"
                          placeholder="add notes"
                          onChange={handleChangeText}
                        />
                      </form>
                      <h5>Please confirm your pin to transfer</h5>
                      <form className="form d-grid">
                        <input
                          type="text"
                          name="pin"
                          onChange={handleChangeText}
                        />
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Send
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
