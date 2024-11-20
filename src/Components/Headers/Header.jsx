import React from "react";
import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";
import { useAuth } from "../../common/AuthContext";

const Header = () => {
  const {isAuthorized} = useAuth();
  return <>{isAuthorized ? <UserHeader /> : <GuestHeader />}</>;
};

export default Header;
