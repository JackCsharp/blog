import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import RegistrationPage from "../Pages/RegistrationPage";
import ProfilePage from "../Pages/ProfilePage";
import ErrorPage from "../Pages/ErrorPage";
import PostsPage from "../Pages/PostsPage";

export const userRoutes = [
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/posts",
    element: <PostsPage/>
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export const guestRoutes = [
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
