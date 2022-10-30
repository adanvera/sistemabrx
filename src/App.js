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
              <Route >
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path='/mineria' element={<Mineria />} />
                <Route exact path='/tickets' element={<Tickets />} />
                <Route exact path='/tickets/:id' element={<DetailsTicket />} />
                <Route exact path='/clientes' element={<Clientes />} />
                <Route exact path='/mineros' element={<Mineros />} />
                <Route exact path='/usuarios' element={<Usuarios />} />
                <Route exact path='/clientes/:id' element={<ClientDetails />} />
                <Route exact path='/seguridad' element={<Seguridad />} />
              </Route>
            </Routes>
          </Fragment>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;
