import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./styles/index.scss";
import { Provider } from "react-redux";
import { configureStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";


const store = configureStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
    <App />
    </Provider>

);

