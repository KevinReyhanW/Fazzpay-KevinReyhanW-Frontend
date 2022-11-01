import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/actions/logout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const imageUser = `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${user.data.image}`;

  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      alert(response.value.data.msg);
      Cookies.remove("token");
      Cookies.remove("userId");
      localStorage.clear();
      router.push("/");
    });
  };

  return (
    <Navbar bg="white" expand="lg" className="my-4">
      <Container>
        <Navbar.Brand>
          <h1 className="header-text">FazzPay</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <NavDropdown
            align="end"
            title={
              <img
                src={imageUser}
                alt=""
                className="rounded-circle"
                style={{ width: "44px" }}
              ></img>
            }
            id="dropdown-menu-align-end"
          >
            <NavDropdown.Item classname="text-danger" onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          <h4 className="header-user-info">
            {user.data.firstName}
            <br />
            {user.data.noTelp}
          </h4>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
