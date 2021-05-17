import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


// TODO: wrap everything in Auth0
ReactDOM.render(
  <React.StrictMode>
      <Auth0Provider
    domain="dev-zlbh2pxe.eu.auth0.com"
    clientId="YykCu4Xg2p6w0pE7YJ4GefEvRYN2SHsT"
    redirectUri={window.location.origin}
  >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
