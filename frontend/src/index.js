import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import rootSaga from "./saga/rootSaga";
import createMiddleWare from "redux-saga";

import RootReducer from "./redux/reducers/rootReducer";
//Middleware for the saga
const sagaMiddleWare = createMiddleWare();

//Redux store
const store = createStore(RootReducer, applyMiddleware(sagaMiddleWare));

//Running the rootSaga in middleware
sagaMiddleWare.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
