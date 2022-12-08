import React, { useEffect, useState } from "react";
import Layout from "../../layout/main";
import UserCard from "components/cardTransfer";
import axiosServer from "../../utils/axiosServer";
import axiosClient from "../../utils/axios";
import cookies from "next-cookies";
import currency from "../../utils/currency";
import date from "../../utils/date";
import { useSelector } from "react-redux";
import PinInput from "components/pin";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import Spinner from "react-bootstrap/Spinner";

export async function getServerSideProps(context) {
  try {
    const dataCookies = cookies(context);
    const params = context.query;
    const page = !params?.page ? 1 : params.page;
    const search = !params?.search ? "" : params.search;
    const sort = !params?.sort ? "firstName ASC" : params.sort;

    const result = await axiosServer.get(
      `user?page=${page}&limit=5&search=${search}&sort=${sort}`,
      {
        headers: {
          Authorization: `Bearer ${dataCookies.token}`,
        },
      }
    );
    return {
      props: {
        data: result.data.data,
        pagination: result.data.pagination,
        sort,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination:
          error.response?.status ===
          403`/error?msg=${error.response?.data.msg}`,
        permanent: false,
      },
    };
  }
}

export default function Transfer(props) {
  const router = useRouter();
  const users = props.data;
  const pagination = props.pagination;
  const sort = props.sort;

  const user = useSelector((state) => state.user.data);

  const [selectedReceiver, setReceiver] = useState({});
  const [formTransfer, setFormTransfer] = useState({
    receiverId: "",
    amount: 0,
    notes: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const isAllFormFilled = Object.keys(pin).every((el) => pin[el]);

  const transferDetails = [
    { name: "Amount", value: currency.format(formTransfer.amount) },
    {
      name: "Balance",
      value: currency.format(
        isError ? +user.balance : +user.balance - +formTransfer.amount
      ),
    },
    { name: "Date&Time", value: date.format(new Date()) },
    { name: "Notes", value: formTransfer.notes },
  ];

  useEffect(() => {
    setReceiver({});
    setIsFormFilled(false);
    setFormTransfer({
      receiverId: "",
      amount: "",
      notes: "",
    });
    setIsConfirmed(false);
    setIsError(false);
    resetPinInput();
  }, []);

  const handleChangeSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(
        `/transfer?page=1${search ? `&search=${search}` : ""}${
          sort ? `&sort=${sort}` : ""
        }`
      );
    }
  };

  const handleSort = (e) => {
    const { value } = e.target;
    router.push(
      `/transfer?page=${pagination.page}${search ? `&search=${search}` : ""}${
        value ? `&sort=${value}` : ""
      }`
    );
  };

  const handleSelectReceiver = (user) => {
    setReceiver(user);
    setFormTransfer({ ...formTransfer, receiverId: user.id });
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormTransfer({ ...formTransfer, [name]: value });
  };

  const handleFormTransfer = (e) => {
    e.preventDefault();
    setIsFormFilled(true);
  };

  const resetPinInput = () => {
    setPin({
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    });
  };

  const handlePinSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const fullPin =
        pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
      const checkPin = await axiosClient.get(`/user/pin/${fullPin}`);
      toast.success(checkPin.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      const result = await axiosClient.post(
        "/transaction/transfer",
        formTransfer
      );
      toast.success(result.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      setIsError(false);
      setIsConfirmed(true);
      resetPinInput();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response?.data.msg === "Wrong pin") {
        resetPinInput();
      } else {
        setIsError(true);
        setIsConfirmed(true);
        resetPinInput();
      }
    }
  };
  const handleHome = () => {
    router.push("/home");
  };
  const handlePagination = (e) => {
    router.push(
      `/transfer?page=${e.selected + 1}${search ? `&search=${search}` : ""}${
        sort ? `&sort=${sort}` : ""
      }`
    );
  };

  return (
    <Layout title={"Transfer "}>
      <div className="main-card  mb-5 transfer bg-white rounded shadow p-3 p-md-4 overflow-hidden position-relative">
        {Object.keys(selectedReceiver).length === 0 ? (
          <div className="d-flex flex-column h-100">
            <h2 className="fs-5 fw-bold mb-3">Search Receiver</h2>
            <div className="mb-3 d-flex align-items-start">
              <div className=" d-flex justify-content-center bg-light  input-with-icon px-2 rounded py-2 me-0 me-md-3 w-100">
                <input
                  type="text"
                  className="search-box rounded  bg-opacity-25 border-0 ps-5 pe-3 w-100  "
                  placeholder="Search receiver here"
                  value={search}
                  onChange={handleChangeSearchInput}
                  onKeyDown={handleSearch}
                />
              </div>
              <select
                className="form-select bg-ligth  bg-opacity-25 border-1 w-25 d-none d-md-block"
                aria-label="sort user"
                onChange={handleSort}
              >
                <option defaultValue={""} value="">
                  --
                </option>
                <option value="firstName ASC">Sort Name Ascending</option>
                <option value="firstName DESC">Sort Name Descending</option>
              </select>
            </div>
            <div className="position-relative flex-grow-1">
              <div className="scrollable-wrapper p-1  top-0 bottom-0 start-0 end-0">
                {users.map((user) => (
                  <div
                    className="user-card rounded mb-2"
                    onClick={() => handleSelectReceiver(user)}
                    key={user.id}
                  >
                    <UserCard data={user} />
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pagination.totalPage}
                onPageChange={handlePagination}
                containerClassName={"pagination mb-0 mt-3"}
                pageClassName={"page-item px-1"}
                pageLinkClassName={"page-link rounded"}
                previousClassName={"page-item visually-hidden"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item visually-hidden"}
                nextLinkClassName={"page-link"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                activeLinkClassName={"text-white shadow"}
              />
            </div>
          </div>
        ) : !isFormFilled ? (
          <div className="d-flex flex-column h-100">
            <h2 className="fs-5 fw-bold mb-3">Transfer Money</h2>
            <UserCard data={selectedReceiver} />
            <form
              onSubmit={handleFormTransfer}
              autoComplete="off"
              className="pt-5 flex-grow-1 d-flex flex-column justify-content-between"
            >
              <div>
                <input
                  type="number"
                  name="amount"
                  min={1000}
                  max={user.balance}
                  className="transfer__amount-input d-block fs-1 fw-bold border-0 text-primary text-center mb-3 w-50 bg-transparent mx-auto "
                  placeholder="0"
                  aria-label="amount of money to transfer"
                  onChange={handleChangeForm}
                  value={formTransfer.amount}
                  required
                />
                <p className="fw-bold text-center">
                  {currency.format(user.balance)} Available
                </p>
                <div className="input-with-icon profile-form mx-auto">
                  <input
                    type="text"
                    maxLength={20}
                    name="notes"
                    className="form-control"
                    placeholder="Add some notes"
                    aria-label="transfer notes"
                    onChange={handleChangeForm}
                    value={formTransfer.notes}
                  />
                </div>
              </div>
              <div className="text-end d-flex d-md-block">
                <button
                  type="button"
                  className="btn btn-outline-primary fw-bold px-4 me-2 flex-grow-1"
                  onClick={() => setReceiver({})}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary fw-bold px-2 px-md-4 flex-grow-1"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        ) : !isConfirmed ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <div>
              <h2 className="fs-5 fw-bold mb-3">Transfer To</h2>
              <div className="mb-4">
                <UserCard data={selectedReceiver} />
              </div>
              <h3 className="fs-5 fw-bold mb-2">Details</h3>
              <div className="row row-cols-1 row-cols-md-2">
                {transferDetails.map((detail, index) => (
                  <div key={index} className="col">
                    <div className="mb-3 rounded shadow-sm p-3 d-none d-md-block">
                      <p className="fs-7 opacity-75 mb-1">{detail.name}</p>
                      <p className="fw-bold m-0 text-truncate">
                        {detail.value}
                      </p>
                    </div>
                    <div className="d-block d-md-none mb-3">
                      <p className="fs-7 opacity-75 mb-1">{detail.name}</p>
                      <p className="fw-bold m-0 text-truncate">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-end d-flex d-md-block">
              <button
                type="button"
                className="btn btn-outline-primary fw-bold px-4 me-2 flex-grow-1"
                onClick={() => setIsFormFilled(false)}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary fw-bold px-2 px-md-4 flex-grow-1"
                data-bs-toggle="modal"
                data-bs-target="#pinInputModal"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column h-100">
            <div className="flex-grow-1 mt-5">
              <h2 className="fs-5 fw-bold mb-3 text-center">
                {!isError ? "Transfer Success" : "Transfer Failed"}
              </h2>
              {isError ? (
                <p className="fs-7 opacity-75 text-center">
                  Error occured. Please check your connection or try again later
                </p>
              ) : null}
              <div className="row row-cols-2 mb-2">
                {transferDetails.map((detail, index) => (
                  <div key={index} className="col">
                    <div className="mb-3 rounded shadow-sm p-3">
                      <p className="fs-7 opacity-75 mb-1">{detail.name}</p>
                      <p className="fw-bold m-0 text-truncate">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="fs-6 fw-bold mb-3">Transfer to</h3>
              <UserCard data={selectedReceiver} />
            </div>
            <div className="text-end d-flex d-md-block">
              {!isError ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold px-4 me-2"
                  >
                    <span className="d-none d-md-inline">Download PDF</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary fw-bold px-4 flex-grow-1"
                    onClick={handleHome}
                  >
                    Back to Dashboard
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary fw-bold px-4 flex-grow-1"
                  onClick={() => router.push("/transfer")}
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="pinInputModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="pinInputModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content px-3 py-2"
            style={{ borderRadius: "20px" }}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="pinInputModal">
                Transfer confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handlePinSubmit}>
              <div className="modal-body">
                <p className="opacity-75">Enter your PIN to transfer</p>
                <div className="profile-form mx-auto">
                  <PinInput pin={pin} setPin={setPin} />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="submit"
                  className="btn btn-primary px-4 flex-grow-1 flex-md-grow-0"
                  disabled={!isAllFormFilled}
                >
                  {isLoading ? (
                    <div className="text-center">
                      <Spinner
                        animation="border"
                        size="lg"
                        className="my-4"
                        variant="primary"
                      />
                    </div>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
