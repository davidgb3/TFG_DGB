import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <ProtectedRoute><Home /></ProtectedRoute>
            },
            {
                path: '/login',
                element: <Login />,
                replace: true
            },
            {
                path: '/register',
                element: <Register />,
                replace: true
            },
            {
                path: '/userProfile',
                element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
            }
        ]
    }
]);