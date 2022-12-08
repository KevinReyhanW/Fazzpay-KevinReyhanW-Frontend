import React, { useEffect, useState } from "react";
import Layout from "layout/main";
import Card from "components/card/transaction";
import { getHistory } from "stores/actions/history";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import { Icon } from "@iconify/react";

export default function History() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dataHistory, setDataHistory] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 7,
    filter: "",
  });
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [pagination]);

  const getData = () => {
    try {
      dispatch(getHistory(pagination))
        .then((response) => setDataHistory(response.value.data.data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="bgPhone m-0 pt-4 rounder-bottom d-lg-none">
        <p
          className="btn btn-light bgPhone text-start ps-0"
          onClick={() => router.back()}
        >
          <Icon icon={"bi:arrow-left"} width="18" /> History
        </p>
      </div>
      <div className="col-12 " style={{ maxHeight: "inherit" }}>
        <div
          className="transaction-card rounder py-3 overflow-auto"
          style={{ maxHeight: "inherit", height: "100vh" }}
        >
          <div className="row ps-3 mt-3 d-none w-100 d-lg-flex">
            <h4 className="col-6 fw-bold">Transaction History</h4>
            <div className="col-6 text-end">
              <div className="col-4 ms-auto">
                <Form.Select
                  size="lg"
                  onChange={(item) =>
                    setPagination({ ...pagination, filter: item.target.value })
                  }
                >
                  <option value={""}>Filter</option>
                  <option value={"WEEK"}>Week</option>
                  <option value={"MONTH"}>Month</option>
                  <option value={"YEAR"}>Year</option>
                </Form.Select>
              </div>
            </div>
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
                    className={"mt-2 ps-2 card-item"}
                  />
                </div>
              ))
            : ""}
        </div>
      </div>
    </Layout>
  );
}
