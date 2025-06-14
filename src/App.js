import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Landing from "./components/landing/Landing";
import ContentPage from "./components/Pages/ContentPage";
import AdminLogin from "./components/Panel/Admin/AdminLogin";
import Ssucess from "./components/Pages/Ssucess";
import Services from "./components/Pages/Services";
import About from "./components/Pages/About";
import Postpage from "./components/Panel/Admin/MainPost";
import Blogpost from "./components/Panel/Admin/BlogViewquill";
import ProtectedRoute from "./components/Panel/Admin/ProtectedRoute";

const HomeLayout = () => <Layout />;
const UserLayout = () => <Layout />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "Page/:_id", element: <ContentPage /> },
      { path: "AdminLogin", element: <AdminLogin /> },
      { path: "Ssucess", element: <Ssucess /> },
      { path: "Services", element: <Services /> },
      { path: "About", element: <About /> },
      { path: "Postpage", element: <Postpage /> },
      { path: "Blogpost", element: <Blogpost /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "Postpage", element: <Postpage /> },
      { path: "Blogpost", element: <Blogpost /> },
      { path: "Page/:_id", element: <ContentPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
