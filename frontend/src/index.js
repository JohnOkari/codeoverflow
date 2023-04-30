import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from "./store/csrf";
import * as sessionActions from './store/session';
import { GoogleOAuthProvider } from '@react-oauth/google';


const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (

      <Provider store={store}>
         <GoogleOAuthProvider clientId="358718786308-suvec5jkso37u1dcldpjflk2hodn31dt.apps.googleusercontent.com">
        <BrowserRouter>
          <QueryParamProvider adapter={ReactRouter5Adapter} >
            <App />
          </QueryParamProvider>
        </BrowserRouter>
        </GoogleOAuthProvider>

      </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApplication = () => {
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}