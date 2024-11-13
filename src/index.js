import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './theme/cores.css'
import './theme/tipografia.css'

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import RegisterUser from './pages/registerUser/RegisterUser';
import RegisterAdmin from './pages/registerAdmin/RegisterAdmin';
import ErrorPage from './pages/home/ErrorPage';

import{createBrowserRouter,  RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/registerUser",
    element: <RegisterUser/>
  },
  {
    path: "/registerAdmin",
    element: <RegisterAdmin/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);  