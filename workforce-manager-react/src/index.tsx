import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css'
import "react-datepicker/dist/react-datepicker.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './routes/Root';
import Error from './routes/Error';
import Home from './routes/Home';
import Login from './routes/identity/Login';
import Register from './routes/identity/Register';
import Assignment from './routes/assignment/Assignment';
import AssignmentList from './routes/assignment/AssignmentList';
import AssignmentCreate from './routes/assignment/AssignmentCreate';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "register/",
                element: <Register />
            },
            {
                path: "login/",
                element: <Login />
            },
            {
                path: "assignments/:id",
                element: <Assignment />
            },
            {
                path: "assignments/",
                element: <AssignmentList />
            },
            {
                path: "assignments/create",
                element: <AssignmentCreate />
            }
        ]
    },
],
{ basename: process.env.PUBLIC_URL });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);