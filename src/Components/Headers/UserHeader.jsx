import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/AuthContext";
import accountApiClient from "../../API/accountApiClient";

const UserHeader = () => {
  const navigate = useNavigate();
  const {setIsAuthorized} = useAuth();

  async function logOut(){
    setIsAuthorized(false);
    navigate("/login");
    accountApiClient.logout();
  }
  return (
  <header>
    <Menu mode="horizontal">
      <Menu.Item onClick={()=>navigate("/myposts")} key="myposts">My Posts</Menu.Item>
      <Menu.Item onClick={()=>navigate("/posts")} key="posts">Posts</Menu.Item>
      <Menu.Item onClick={()=>logOut()} key="logout">Log out</Menu.Item>
    </Menu>
  </header>
  )
  };

export default UserHeader;
