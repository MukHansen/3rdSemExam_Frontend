import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import facade from "./components/loginFacade";
import LogIn from "./components/LogIn";
import Search from "./components/Search";
import Home from "./components/Home";
import Hobbies from "./components/Hobbies";

function App() {
  console.log("App");
  const token = localStorage.getItem("jwtToken");
  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [allHobbies, setAllHobbies] = useState([]);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    if (loggedIn) {
        const getData = async () => {
            try {
                const hobbyData = await facade.fetchAllHobbies();
                console.log("hobbyData", hobbyData);
                setAllHobbies(hobbyData);
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
            <Route path="/search"><Search loggedIn={loggedIn} allHobbies={allHobbies} person={person} setPerson={setPerson}/></Route>
            <Route path="/hobbies"><Hobbies loggedIn={loggedIn} allHobbies={allHobbies} setAllHobbies={setAllHobbies}/></Route>
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
        <li><NavLink activeClassName="active" to="/search">{loggedIn ? <div>Search</div> : <div id="navbar"></div>}</NavLink></li>
        <li><NavLink activeClassName="active" to="/hobbies">{loggedIn ? <div>Hobbies</div> : <div id="navbar"></div>}</NavLink></li>
        <li><NavLink activeClassName="active" to="/log">{loggedIn ? <div>Logout</div> : <div>Login</div>}</NavLink></li>
      </ul>
    </div>
  )
}

function NoMatch() {
  console.log("NoMatch");
  return (
    <div>
      hello NoMatch
    </div>
  )
}

export default App;
