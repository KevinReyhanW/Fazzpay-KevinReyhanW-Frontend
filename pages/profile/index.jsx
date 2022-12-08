import React, { useState } from "react";
import Layout from "layout/main";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../public/anon.png";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../stores/actions/logout";
import "react-toastify/dist/ReactToastify.css";
import { getDataUserById, updateUserImage } from "../../stores/actions/user";
import Spinner from "react-bootstrap/Spinner";
export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dataUser = user.data;
  const imageUser = `${process.env.URL_CLOUDINARY}${user.data.image}`;
  const [newImage, setNewImage] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const lengthImage = Object.keys(newImage).length;

  // const handleNavigate = (nav) => {
  //   router.push(`/${nav}`);
  // };

  const handleInformation = () => {
    router.push("/profile/information");
  };

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

  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      toast.success(response.value.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        Cookies.remove("token");
        Cookies.remove("id");
        localStorage.clear();
        router.push("/");
      }, 3000);
    });
  };

  return (
    <Layout>
      <main className="container my-5">
        <div className="row">
          <div>
            {user.isLoading ? (
              <div className="text-center">
                <Spinner
                  animation="border"
                  size="lg"
                  className="my-4"
                  variant="primary"
                />
              </div>
            ) : (
              <div
                className="py-4 rounded rounded-3 bg-white"
                style={{ padding: "0px 30px" }}
              >
                <div className="text-center mb-3">
                  <img
                    src={
                      lengthImage > 0
                        ? imagePreview
                        : dataUser.image
                        ? imageUser
                        : defaultImage
                    }
                    alt=""
                    className="rounded-3 img-size"
                  />
                </div>
                <div className="text-center mb-1">
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
                  <div className="text-center">
                    <button className="button-save" onClick={handleUpdateImage}>
                      Save
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
            <div>
              <div className="text-center mb-2">
                <h2>
                  {dataUser.firstName} {dataUser.lastName}
                </h2>
                <h6>{dataUser.noTelp}</h6>
              </div>
              <div className="row py-3 px-3 d-flex flex-column justify-content-center">
                <div className="mt-5 col-lg-6 container text-start">
                  <button
                    className="btn btn-lg bg-light w-100 py- d-flex justify-content-between"
                    onClick={handleInformation}
                  >
                    Personal Information
                    <Icon icon={"bi:arrow-right"} width="28" />
                  </button>
                  <button className="btn btn-lg bg-light w-100 py- d-flex justify-content-between mt-4">
                    Change Password
                    <Icon icon={"bi:arrow-right"} width="28" />
                  </button>

                  <button className="btn btn-lg bg-light w-100 py- d-flex justify-content-between mt-4">
                    Change PIN
                    <Icon icon={"bi:arrow-right"} width="28" />
                  </button>

                  <button
                    className="btn btn-lg bg-light w-100 py- d-flex justify-content-between mt-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </Layout>
  );
}
