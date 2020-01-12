import URL from "../settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class LoginFacade {
  setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  loggedIn = () => {
    console.log("loggedIn func");
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };
  logout = () => {
    localStorage.removeItem("jwtToken");
  };
  login = (user, pass) => {
    console.log("user, pass", user, pass);
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        this.setToken(res.token);
      })
      .catch(err => {
        throw err;
      });
  };

  getRole = () => {
    let jwt = localStorage.getItem("jwtToken");
    let jwtData = jwt.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.roles;
  };

  makeOptions(method, addToken, body) {
    console.log("makeOptions");
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && this.loggedIn()) {
      opts.headers["x-access-token"] = this.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    console.log("opts", opts);
    return opts;
  }

  fetchAllHobbies = () => {
    console.log("fetchingAllHobbies");
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/person/allhobbies", options).then(handleHttpErrors);
  };

  deleteHobby = (hobby) => {
    console.log("Deleting hobby", hobby);
    const options = this.makeOptions("DELETE", true); //True add's the token
    return fetch(URL + "/api/person/deletehobby/" + hobby, options).then(handleHttpErrors);
  };

  addEditHobby = (hobby) => {
    console.log("Editing hobby", hobby);
    const options = this.makeOptions("PUT", true, hobby); //True add's the token
    return fetch(URL + "/api/person/edithobby", options).then(handleHttpErrors);
  };

  fetchPersonsByHobby = (hobby) => {
    console.log("fetchingPersonsByHobby");
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/person/hobby/" + hobby, options).then(handleHttpErrors);
  };

  fetchPersonById = (id) => {
    console.log("fetchingPersonById");
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/person/id/" + id, options).then(handleHttpErrors);
  };

  fetchPersonByEmail = (email) => {
    console.log("fetchingPersonByEmail");
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/person/email/" + email, options).then(handleHttpErrors);
  };

  fetchPersonByPhone = (phone) => {
    console.log("fetchingPersonByPhone");
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/person/phone/" + phone, options).then(handleHttpErrors);
  };

  fetchData = () => {
    console.log("fetchData");
    const options = this.makeOptions("GET", true); //True add's the token
    if (this.getRole() === "admin") {
      return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    } else {
      return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }
  };
}
const facade = new LoginFacade();
export default facade;
