import React from "react";
import Image from "next/image";
import defaultImage from "../../public/anon.png";

export default function cardTransfer(props) {
  const { firstName, lastName, image } = props.data;

  return (
    <div className="rounded shadow-sm p-2 d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="rounded me-3" style={{ width: "48px", height: "48px" }}>
          <Image
            src={image ? process.env.URL_CLOUDINARY + image : defaultImage}
            alt="profile picture"
            width={48}
            height={48}
            objectFit="cover"
            style={{ borderRadius: "12px" }}
          />
        </div>
        <div>
          <p className="fw-bold mb-1">{firstName + " " + lastName}</p>
        </div>
      </div>
    </div>
  );
}
