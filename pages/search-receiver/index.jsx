import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { getDataUserById } from "../../stores/actions/user";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import Layout from "layout";
import { Icon } from "@iconify/react";
import axiosClient from "utils/axios";

export default function SearchReceiver() {
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  //   const imageUser = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${user.data.image}`;
  const router = useRouter();

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    try {
      const result = await axiosClient.get(
        "/user?page=1&limit=5&search=&sort=firstName ASC&image"
      );
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (nav) => {
    router.push(`/${nav}`);
  };

  return (
    <Layout title="Home">
      <div className="container receiver-container">
        <div className="row row-search-receiver">
          <div className="col-md-12 col-sm-12 d-flex justify-content-center align-items-center search-receiver">
            <header className="dashboard-up">
              <div className="col-md-6 d-flex justify-content-start align-items-start search-receiver-user">
                <div className="row">
                  <h1>Search Receiver</h1>
                  <div className="d-flex align-items-start search">
                    <div className="inputan">
                      <Icon icon={"akar-icons:search"} width="28" />
                      <input
                        type="text"
                        className="search-box rounded bg-secondary"
                        placeholder="Search receiver here"
                      />
                    </div>
                  </div>
                  {data.map((item) => (
                    <div className="my-3" key={item.id}>
                      <button className="profile-pic">asdf</button>
                      <button
                        className="button-search-receiver"
                        onClick={() => handleNavigate(`receiver/${item.id}`)}
                      >
                        {item.firstName}
                        {item.lastName}
                        <br />
                        {item.noTelp}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>
    </Layout>
  );
}
