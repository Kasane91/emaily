import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import axios from "axios";
//Dev only axios helpers
window.axios = axios;

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
