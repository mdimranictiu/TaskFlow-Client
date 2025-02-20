import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
        path: "/",
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
]
  },
]);
