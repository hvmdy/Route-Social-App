import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Authlaytout from "./Layouts/Authlaytout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Mainlayout from "./Layouts/Mainlayout";
import Newsfeed from "./pages/Newsfeed/Newsfeed";
import Profile from "./pages/Profile/Profile";
import Notification from "./pages/Notification/Notification";
import Notfound from "./pages/Notfound/Notfound";
import { Toaster } from "react-hot-toast";
import AppProtectedRoutes from "./components/ProtectedRoutes/AppProtectedRoutes";
import AuthProtectedRoutes from "./components/ProtectedRoutes/AuthProtectedRoutes";
import PostDetails from "./pages/PostDetails/PostDetails";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <AuthProtectedRoutes>
          <Authlaytout />
        </AuthProtectedRoutes>
      ),
      children: [
        { index: true, element: <Navigate to="login" /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "",
      element: (
        <AppProtectedRoutes>
          <Mainlayout />
        </AppProtectedRoutes>
      ),
      children: [
        { index: true, element: <Navigate to="feed" /> },
        { path: "feed", element: <Newsfeed /> },
        { path: "profile", element: <Profile /> },
        { path: "notification", element: <Notification /> },
        { path: "postDetails/:id", element: <PostDetails /> },
      ],
    },
    { path: "*", element: <Notfound /> },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}
