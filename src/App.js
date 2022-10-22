import './assets/css/default.css';
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./Components/Commons/Context/DataContext";
import MainRoute from "./Components/Commons/MainRoute";
import Login from "./Components/Login";
import Sidebar from './Components/Commons/Sidebar';
import Dashboard from './Components/Commons/Dashboard';

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
              </Route>
            </Routes>
          </Fragment>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;
