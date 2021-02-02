import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import store from "./store/store";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import SearchArea from "./components/SearchArea";
import Spinner from "./components/Spinner";
import ShowSection from "./components/ShowSection";
import ItemDetail from "./components/ItemDetail";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Login from "./components/LogIn";
import { connect } from "react-redux";
import { setAuthToken } from "./store/utility";
import { loadUser } from "./store/actions/auth";
import { withRouter } from "react-router";

import "./App.css";
class App extends Component {
  componentDidMount() {
    setAuthToken(localStorage.token);
    console.log(this.props.loading);
    store.dispatch(loadUser());
  }

  render() {
    let routes;

    if (this.props.loading || this.props.loading === undefined) {
      routes = <Spinner />;
    } else if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/movies" component={ItemDetail} />
          <Route path="/browse-movies" component={ShowSection} />

          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={ShowSection} />
          <Route path="*" component={NotFound} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/browse-movies" component={ShowSection} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route
            path="/profile"
            render={() => {
              return this.props.loading ? (
                <Spinner />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                  }}
                />
              );
            }}
          />
          <Route
            path="/movies"
            render={() => {
              return this.props.loading ? (
                <Spinner />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route exact path="/" component={ShowSection} />

          <Route path="*" component={NotFound} />
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
    loading: state.auth.loading,
  };
};
export default withRouter(connect(mapStateToProps)(App));
