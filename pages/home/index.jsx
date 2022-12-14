import React, { useEffect, useState } from "react";
import Layout from "layout/main";
import Card from "components/card/transaction";
import ModalTopUp from "components/modal";
import { topup } from "stores/actions/topup";
import Cookies from "js-cookie";
import { dashboard } from "stores/actions/dashboard";
import { getDataUserById } from "stores/actions/user";
import { getHistory } from "stores/actions/history";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Icon } from "@iconify/react";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [dataDashboard, setDataDashboard] = useState({});
  const [dataHistory, setDataHistory] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  // console.log(
  //   `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${dataHistory[0].image}`
  // );

  const handleHistory = () => {
    router.push("/history");
  };

  const handleTransfer = () => {
    router.push("/transfer");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      dispatch(getDataUserById(Cookies.get("id")))
        .then((response) => setUser(response.value.data.data))
        .catch((error) => console.log(error));

      dispatch(dashboard(Cookies.get("id")))
        .then((response) => setDataDashboard(response.value.data.data))
        .catch((error) => console.log(error));

      dispatch(getHistory({ page: 1, limit: 4, filter: "" }))
        .then((response) => setDataHistory(response.value.data.data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const datasets = dataDashboard.listIncome?.map((v, i) => {
    return Object.keys(v).reduce((obj, key) => {
      obj[key] = v[key] - dataDashboard.listExpense[i][key];
      return obj;
    }, {});
  });

  const data = {
    labels: Array(dataDashboard.listExpense)
      ? dataDashboard.listExpense?.map((v) => v.day.slice(0, 3))
      : [],
    datasets: [
      {
        label: "Total",
        data: datasets?.map((v) => v.total),
        backgroundColor: "#2a33de",
        barThickness: 20,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    plugins: {},
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return "Rp." + value.toLocaleString();
          },
          color: "black",
        },
        grid: {
          color: "rgba(228, 228, 228, 0.2)",
          borderColor: "rgba(228, 228, 228, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "black",
          padding: 20,
        },
        grid: {
          color: "rgba(228, 228, 228, 0.2)",
          borderColor: "rgba(228, 228, 228, 0.2)",
        },
      },
    },
    layout: {
      padding: {
        top: 50,
      },
    },
  };

  return (
    <Layout>
      <div className="bg-balance rounded 3 shadow py-3 ">
        <div className="row p-lg-0 m-lg-0 ">
          <div className="col-6 col-lg-9 mt-3 mb-3">
            <p className="mb-1 fw-bold">Balance</p>
            <h3 className="fw-bold text-white mb-1">
              Rp.{user.balance?.toLocaleString("id") || 0}
            </h3>
            <h6 className="fw-light text-white">{user.noTelp}</h6>
          </div>
          <div className="col-3  text-end mt-4 mt-lg-0 ">
            <button
              className="btn btn-primary d-flex align-items-center w-75 justify-content-center"
              onClick={handleTransfer}
            >
              <Icon icon={"bx:up-arrow-alt"} width="28" /> Transfer
            </button>
            <button
              className="btn btn-primary d-flex align-items-center w-75 justify-content-center mt-4"
              onClick={() => setModalShow(true)}
            >
              <Icon icon={"akar-icons:plus"} width="28" />
              Top Up
            </button>
          </div>
        </div>
      </div>
      <div
        className="col-7 bg-white shadow rounder mt-4 d-none d-lg-block "
        style={{ minHeight: "468px" }}
      >
        <div className="row p-3">
          <div className="col-6">
            <p className="m-0">
              <Icon
                icon={"material-symbols:arrow-downward-rounded"}
                width="30"
                color="green"
              />
            </p>
            <p>Income</p>
            <h5>Rp.{dataDashboard.totalIncome?.toLocaleString() || 0}</h5>
          </div>
          <div className="col-6">
            <p className="m-0">
              <Icon
                icon={"material-symbols:arrow-upward-rounded"}
                width="30"
                color="red"
              />
            </p>
            <p>Expense</p>
            <h5>Rp.{dataDashboard.totalExpense?.toLocaleString() || 0}</h5>
          </div>
          <Bar options={options} data={data} />
        </div>
      </div>

      <div
        className="col-12 col-lg-5 mt-4  dashboard-transaction shadow"
        style={{ minHeight: "450px" }}
      >
        <div
          className="transaction-card rounder pt-4 h-100"
          style={{ minHeight: "450px" }}
        >
          <div className="mx-3 px-2 d-flex justify-content-between">
            <p className=" ">Transaction History</p>
            <button className="click-me" onClick={handleHistory}>
              See all
            </button>
          </div>
          {dataHistory
            ? dataHistory.map((item) => (
                <div key={item.id} className="">
                  <Card
                    leftTop={`${item.firstName} ${item.lastName}`}
                    leftBottom={`${item.type}`}
                    right={`${item.amount}`}
                    image={`${item.image}`}
                    type={item.type}
                    className={"mt-2 ps-2 cardItem"}
                  />
                </div>
              ))
            : ""}
        </div>
      </div>
      <ModalTopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        submit={(amount) =>
          dispatch(topup({ amount }))
            .then((res) => window.open(res.value.data.data.redirectUrl))
            .catch((err) => alert(err))
        }
      />
    </Layout>
  );
}
