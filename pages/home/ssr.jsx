import React from "react";

import Layout from "layout";
import axiosServer from "utils/axiosServer";

import Cookies from "next-cookies"; // digunakan untuk kebutuhan mengambil data untuk server side

export default function HomeSSR(props) {
  return (
    <Layout title="Home">
      <div className="text-center container">
        <h1>Home Page SSR</h1>
        <p>{process.env.URL_BACKEND}</p>
        {props.listUser.map((item) => (
          <div className="card my-3" key={item.id}>
            <h1>{item.firstName}</h1>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const dataCookies = Cookies(context);
  const result = await axiosServer.get(
    "/user?page=1&limit=50&search=&sort=firstName ASC",
    {
      headers: {
        Authorization: `Bearer ${dataCookies.token}`,
      },
    }
  );
  return {
    props: {
      listUser: result.data.status === 200 ? result.data.data : [],
      pagination: result.data.status === 200 ? result.data.pagination : {},
    }, // will be passed to the page component as props
  };
}
