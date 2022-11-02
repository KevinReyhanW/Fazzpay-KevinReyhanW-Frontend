import React, { useState } from "react";
import Layout from "layout";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDataUserById, updateUserImage } from "../../stores/actions/user";
export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const dataUser = user.data;
  const imageUser = `${process.env.URL_CLOUDINARY}${user.data.image}`;
  const [newImage, setNewImage] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const lengthImage = Object.keys(newImage).length;

  const handleInputImage = (e) => {
    const { name, files } = e.target;
    setNewImage({ [name]: files[0] });
    setImagePreview(URL.createObjectURL(files[0]));
  };

  const handleUpdateImage = () => {
    const imageData = new FormData();
    imageData.append("image", newImage.image);
    dispatch(updateUserImage(dataUser.id, imageData))
      .then((response) => {
        dispatch(getDataUserById(dataUser.id));
        toast.success(response.value.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) =>
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  };

  return (
    <Layout>
      <main className="container my-5">
        <div className="row">
          <div className="rounded 3 mb-3 text-black shadow bg-white bg-profile text-center">
            {user.isLoading ? (
              <h1>Loading</h1>
            ) : (
              <div
                className="py-5 rounded rounded-3 bg-white"
                style={{ padding: "0px 30px" }}
              >
                <div className="text-center mb-3">
                  <img
                    src={
                      lengthImage > 0
                        ? imagePreview
                        : dataUser.image
                        ? imageUser
                        : "/anon.png"
                    }
                    alt=""
                    className="rounded-3 img-size"
                  />
                </div>
                <div className="text-center mb-3">
                  <label className="border-0 bg-transparent" htmlFor="image">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="d-none"
                      onChange={handleInputImage}
                    />
                    <div className="d-flex align-items-center color-gray gap-2">
                      <Icon icon={"fa-solid:pen"} />
                      <span className="fs-5">Edit</span>
                    </div>
                  </label>
                </div>
                {lengthImage > 0 ? (
                  <div className="text-center mb-5">
                    <button className="button-save" onClick={handleUpdateImage}>
                      Save
                      <ToastContainer />
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
