import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
      <Auth0Provider
        domain="dev-yaskul-6.us.auth0.com"
        clientId="ventCRzSwTOay1N055Z08ZdRvJ034nff"
        redirectUri={window.location.origin}
      >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
