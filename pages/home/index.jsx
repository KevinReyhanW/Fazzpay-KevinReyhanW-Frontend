import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Layout from "layout";
import ModalTopUp from "components/modal";
import axiosClient from "utils/axios";
// import { getDataUserById } from "../../stores/actions/user";

export default function Home() {
  const router = useRouter();
  const handleNavigate = (nav) => {
    router.push(`/${nav}`);
  };
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);

  const getHistoryTransfer = async () => {
    try {
      const result = await axiosClient.get(
        "/transaction/history?page=1&limit=5&filter=MONTH"
      );
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHistoryTransfer();
  }, []);

  return (
    <Layout>
      <main className="container my-5">
        <div className="row">
          <div className="col-12 rounded 3 mb-3 text-white shadow bg-balance">
            <div className="row py-3 px-3">
              <div className="col-9">
                <small>Balance</small>
                <h2>Rp.{user.data.balance}</h2>
                <small>{user.data.noTelp}</small>
              </div>
              <div className="col-3">
                <button
                  className="btn btn-outline-primary text-white d-flex align-items-center w-75 justify-content-center bg-button"
                  onClick={() => handleNavigate("/search-receiver")}
                >
                  <Icon icon={"bx:up-arrow-alt"} width="28" /> Transfer
                </button>
                <button
                  className="btn btn-outline-primary text-white d-flex align-items-center w-75 justify-content-center mt-4 bg-button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <Icon icon={"akar-icons:plus"} width="28" />
                  Top Up
                  <ModalTopUp />
                </button>
              </div>
            </div>
          </div>
          <div className="col-6 rounded 3 mb-3 text-white">
            <div className="row py-3 px-3 bg-secondary  me-1 shadow">
              <div className="col-6">
                <small>Balance</small>
                <h2>Rp.{user.data.balance}</h2>
                <small>{user.data.noTelp}</small>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-outline-primary d-flex align-items-center w-75 justify-content-center"
                  onClick={() => handleNavigate("/search-receiver")}
                >
                  <Icon icon={"bx:up-arrow-alt"} width="28" /> Transfer
                </button>
                <button
                  className="btn btn-outline-primary d-flex align-items-center w-75 justify-content-center mt-4"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <Icon icon={"akar-icons:plus"} width="28" />
                  Top Up
                  <ModalTopUp />
                </button>
              </div>
              <div className="col-12 text-center">
                <h1>INI TEMPAT GRAPH</h1>
              </div>
            </div>
          </div>
          <div className="col-6 rounded 3 mb-3 text-white">
            <div className="row py-3 px-3 bg-danger ms-1 shadow">
              <div className="col-6">
                <h2>Transaction History</h2>
              </div>
              <div className="col-3 ms-3">
                <h2>See all</h2>
              </div>
              <div className="col-4">
                {data.map((item) => (
                  <div className="my-3" key={item.id}>
                    <div className="transfer-note">{item.firstName}</div>
                    <div className="transfer-note">Rp.{item.amount}</div>
                  </div>
                ))}
              </div>
              <div className="col-6"></div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );

  // return (
  //   <Layout title="Home">
  //     <div className="container home-container">
  //       <div className="row">
  //         <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
  //           <header className="dashboard-up">
  //             <h4 className="home-text">Balance</h4>
  //             <h1 className="home-number">Rp.{user.data.balance}</h1>
  //             <br />
  //             <h4 className="home-text">{user.data.noTelp}</h4>
  //           </header>
  //         </div>
  //         <div className="col-md-5 col-sm-12 d-flex justify-content-center align-items-center">
  //           <header>
  //             <button
  //               type="button"
  //               className="btn btn-primary dashboard-button"
  //               onClick={() => handleNavigate("/search-receiver")}
  //               // data-bs-toggle="modal"
  //               data-bs-target="#staticBackdrop"
  //             >
  //               <Icon icon={"bx:up-arrow-alt"} width="28" /> Transfer
  //             </button>
  //             <br />
  //             <br />
  //             <ModalTopUp />
  //           </header>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="container history-container">
  //       <div className="row">
  //         <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
  //           <header className="dashboard-up">
  //             <h4 className="transfer-text-header">Transcation History</h4>
  //             {data.map((item) => (
  //               <div className="my-3" key={item.id}>
  //                 <div className="transfer-note">{item.firstName}</div>
  //                 <div className="transfer-note">Rp.{item.amount}</div>
  //               </div>
  //             ))}
  //           </header>
  //         </div>
  //       </div>
  //     </div>
  //   </Layout>
  // );
}
