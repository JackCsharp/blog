import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const GuestHeader = () => {
  const navigate = useNavigate();
  return (
    <header>
      <Menu mode="horizontal">
        <Menu.Item onClick={() => navigate("/home")} key="home">
          Home
        </Menu.Item>
        <Menu.Item onClick={() => navigate("/login")} key="login">
          Log in
        </Menu.Item>
        <Menu.Item onClick={() => navigate("/register")} key="register">
          Reg
        </Menu.Item>
      </Menu>
    </header>
  );
};

export default GuestHeader;
