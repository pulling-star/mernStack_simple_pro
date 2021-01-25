import React, { useEffect } from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import store from "./store/store";

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDom.render(app, document.getElementById("root"));
