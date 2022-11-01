import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { topup } from "../../stores/actions/topup";

export default function ModalTopUp() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    amount: "",
  });
  const handleSubmit = () => {
    dispatch(topup(form))
      .then((response) => {
        alert(response.value.data.data.redirectUrl);
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* <button
        type="button"
        className="btn btn-secondary dashboard-button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <Icon icon={"akar-icons:plus"} width="28" /> Top up
      </button> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Topup
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Enter the amount of money, and click submit
            </div>
            <input
              type="text"
              id="amount"
              name="amount"
              className="input-modal-topup"
              placeholder="Please enter the amount of money you want to top up"
              onChange={handleChangeText}
            />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
