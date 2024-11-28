import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './theme/cores.css'
import './theme/tipografia.css'

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import RegisterUser from './pages/register/Register';
import FutebolQuadras from './pages/Listagem/FutebolQuadras'
import ErrorPage from './pages/home/ErrorPage';
import VoleiQuadras from './pages/Listagem/VoleiQuadras';
import TenisQuadras from './pages/Listagem/TenisQuadras';

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
    path: "/register",
    element: <RegisterUser/>
  },
  {
    path: "/FutebolQuadras",
    element: <FutebolQuadras/>
  },
  {
    path: "/VoleiQuadras",
    element: <VoleiQuadras/>
  },
  {
    path: "/TenisQuadras",
    element: <TenisQuadras/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
