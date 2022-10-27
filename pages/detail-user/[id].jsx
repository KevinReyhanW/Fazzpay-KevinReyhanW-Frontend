import React from "react";

import { useRouter } from "next/router";

export default function DetailUser() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);
  return (
    <div>
      <h1>DetailUser = {id}</h1>
    </div>
  );
}
