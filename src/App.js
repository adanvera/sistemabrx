import './assets/css/default.css';
import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataContext, DataProvider } from "./Components/Commons/Context/DataContext";
import MainRoute from "./Components/Commons/MainRoute";
import Login from "./Components/Login";
import Sidebar from './Components/Commons/Sidebar';
import Dashboard from './Components/Commons/Dashboard';
import Mineria from './Components/Mineria/Mineria';
import Tickets from './Components/Mineria/Tickets/Tickets'
import DetailsTicket from './Components/Mineria/Tickets/DetailsTicket';
import Clientes from './Components/Clientes/Clientes';
import Mineros from './Components/Mineria/Mineros/Mineros';
import Usuarios from './Components/Usuarios/Usuarios';
import ClientDetails from './Components/Clientes/ClientDetails';
import Seguridad from './Components/Seguridad/Seguridad';
import { useEffect } from 'react';
import { useState } from 'react';
import { ROLES } from './Components/Helpers/helper';
import NoRoute from './Components/Commons/NoRoute';
import ProtectedRoute from './Components/Commons/ProtectedRoute';
import ChangePass from './Components/Commons/ChangePass';

const App = (props) => {

  const { sidebarStatus } = props

  return (
    <DataProvider>
      <div className="App">
        <BrowserRouter>
          <Fragment>
            {
              !['/'].includes(window.location.pathname) ?
                (<Sidebar sidebarStatus={sidebarStatus} />) : ''
            }
            <Routes>
              <Route path="/" element={<MainRoute />}>
                <Route index element={<Login />} />
              </Route>
              <Route>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/mineria" element={<ProtectedRoute><Mineria /></ProtectedRoute>} />
                <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
                <Route path="/tickets/:id" element={<ProtectedRoute><DetailsTicket /></ProtectedRoute>} />
                <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
                <Route path="/mineros" element={<ProtectedRoute><Mineros /></ProtectedRoute>} />
                <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
                <Route path="/clientes/:id" element={<ProtectedRoute><ClientDetails /></ProtectedRoute>} />
                <Route path="/seguridad" element={<ProtectedRoute><Seguridad /></ProtectedRoute>} />
                <Route path='/adjust'element={<ProtectedRoute><ChangePass /></ProtectedRoute>} />
              </Route>
            </Routes>
          </Fragment>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;
