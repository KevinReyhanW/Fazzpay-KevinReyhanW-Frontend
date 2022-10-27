import React from "react";
import axios from "axios";

export default function DetailUser(props) {
  return (
    <div className="text-center">
      <h1>DetailUser</h1>
      <p>Name = {props.detailUser.name}</p>
      <p>Email = {props.detailUser.email}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const result = await axios.get("https://jsonplaceholder.typicode.com/users");
  const listPath = result.data.map((item) => ({
    params: {
      id: `${item.id}`,
    },
  }));
  return {
    paths: listPath,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const result = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${context.params.id}`
  );
  return {
    props: {
      detailUser: result.data,
    }, // will be passed to the page component as props
  };
}
