import React from "react";

import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>Post Page</h1>
    </div>
  );
}
