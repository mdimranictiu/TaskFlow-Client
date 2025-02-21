import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import PrivateRoute from "../hooks/PrivateRoute";
import AddTask from "../pages/AddTask";
import Home from "../pages/Home";
import MyProfile from "../pages/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
             path: '',
             element: <Home></Home>
          },
          {
            path: "my-tasks", 
            element: <div>My Tasks</div>,
          },
          {
            path: "add-task", 
            element: <PrivateRoute><AddTask></AddTask></PrivateRoute>,
          },
          {
            path: 'my-profile',
            element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
          }
        ],
      },
    ],
  },
]);
