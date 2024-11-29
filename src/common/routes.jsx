import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import RegistrationPage from "../Pages/RegistrationPage";
import ErrorPage from "../Pages/ErrorPage";
import PostsPage from "../Pages/PostsPage";
import MyPosts from "../Pages/MyPostsPage";

export const userRoutes = [
  {
    path: "/myposts",
    element: <MyPosts />,
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
