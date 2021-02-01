import React, { Component } from "react";

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
import Profile from "./components/Profile";
import Login from "./components/LogIn";
import { connect } from "react-redux";
import { setAuthToken } from "./store/utility";
import { loadUser } from "./store/actions/auth";
import "./App.css";
class App extends Component {
  componentDidMount() {
    setAuthToken(localStorage.token);

    store.dispatch(loadUser());
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/browse-movies" component={ShowSection} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={ShowSection} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/movies" component={ItemDetail} />
          <Route path="/browse-movies" component={ShowSection} />

          <Route path="/profile" component={Profile} />
          <Route path="/" component={ShowSection} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      );
    }
    return (
      <div style={{ background: "#1d1d1d" }}>
        <Router>
          <header>
            <Navbar />
          </header>
          {routes}
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(App);
