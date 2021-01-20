import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchArea from "./components/SearchArea";
import ShowSection from "./components/ShowSection";
import ItemDetail from "./components/ItemDetail";
import "./App.css";
const App = () => {
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
          <Route path="/" component={ShowSection} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
