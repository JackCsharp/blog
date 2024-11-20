import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userRoutes, guestRoutes } from "./common/routes";
import Header from "./Components/Headers/Header";
import { useEffect } from "react";
import { useAuth } from "./common/AuthContext";


const Router = () => {
  const { isAuthorized } = useAuth();
  const routes = isAuthorized ? userRoutes : guestRoutes;

  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
