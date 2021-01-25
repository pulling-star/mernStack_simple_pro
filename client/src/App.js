import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import store from "./store/store";
import Navbar from "./components/Navbar";
import SearchArea from "./components/SearchArea";
import ShowSection from "./components/ShowSection";
import ItemDetail from "./components/ItemDetail";
import Register from "./components/Register";
import Login from "./components/LogIn";
import { setAuthToken } from "./store/utility";
import { loadUser } from "./store/actions/auth";
import "./App.css";
const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  return (
    <div style={{ background: "#1d1d1d" }}>
      <Router>
        <header>
          <Navbar />
        </header>
        {/* <SearchArea /> */}
        <Switch>
          <Route path="/movies" component={ItemDetail} />
          <Route path="/browse-movies" component={ShowSection} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={ShowSection} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
