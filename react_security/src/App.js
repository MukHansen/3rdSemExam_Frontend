import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import facade from "./components/loginFacade";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Drivers from "./components/Drivers";
import Trucks from "./components/Trucks";

function App() {
  console.log("App");
  const token = localStorage.getItem("jwtToken");
  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [allDrivers, setAllDrivers] = useState([]);
  const [allTrucks, setAllTrucks] = useState([]);

  useEffect(() => {
    if (loggedIn) {
        const getData = async () => {
            try {
                const driverData = await facade.fetchAllDrivers();
                console.log("driverData", driverData);
                setAllDrivers(driverData);
                const truckData = await facade.fetchAllTrucks();
                console.log("truckData", truckData);
                setAllTrucks(truckData);
            } catch (e) {
                console.log("err", e);
            }
        };
        getData();
    }
}, [loggedIn]);

  const logout = () => {
    console.log("App - logout");
    facade.logout();
    setLoggedIn(false);
    console.log("loggedIn", loggedIn);
  };
  const login = (user, pass) => {
    console.log("App - login");
    facade.login(user, pass).then(res => setLoggedIn(true));
    console.log("loggedIn", loggedIn);
  };
  return (
    <div>
      <Router >
        <div>
          <Header loggedIn={loggedIn} />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/drivers"><Drivers loggedIn={loggedIn} allDrivers={allDrivers} setAllDrivers={setAllDrivers}/></Route>
            <Route path="/trucks"><Trucks loggedIn={loggedIn} allTrucks={allTrucks} setAllTrucks={setAllTrucks}/></Route>
            <Route path="/log"><LogIn
              facade={facade}
              loggedIn={loggedIn}
              login={login}
              logout={logout}
            /></Route>
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Header({ loggedIn }) {
  console.log("Header");
  return (
    <div>
      <ul className="header">
        <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="active" to="/drivers">{loggedIn ? <div>Drivers</div> : <div id="navbar"></div>}</NavLink></li>
        <li><NavLink activeClassName="active" to="/trucks">{loggedIn ? <div>Trucks</div> : <div id="navbar"></div>}</NavLink></li>
        <li><NavLink activeClassName="active" to="/log">{loggedIn ? <div>Logout</div> : <div>Login</div>}</NavLink></li>
      </ul>
    </div>
  )
}

function NoMatch() {
  console.log("NoMatch");
  return (
  <Home />
  )
}

export default App;
