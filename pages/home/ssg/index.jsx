import React from "react";
import Layout from "layout";

import axios from "axios";
import { useRouter } from "next/router";

export default function HomeSSG(props) {
  const router = useRouter();
  return (
    <Layout title="Home">
      <div className="text-center container">
        <h1>Home Page SSG</h1>
        <p>{process.env.URL_BACKEND}</p>
        {props.listUser.map((item) => (
          <div
            className="card my-3"
            key={item.id}
            onClick={() => {
              router.push(`/home/ssg/${item.id}`);
            }}
          >
            <h1>{item.name}</h1>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const result = await axios.get("https://jsonplaceholder.typicode.com/users");
  return {
    props: {
      listUser: result.data,
    }, // will be passed to the page component as props
  };
}
