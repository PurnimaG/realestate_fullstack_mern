import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-llgbmbfl7thpv2jk.us.auth0.com"
      clientId="yU9d1BAgI5BWpM08thlC3vEr9LgsjGQE"
      authorizationParams={{
        redirect_uri: "https://realestate-fullstack-mern-henna.vercel.app"
      }}
      audience="http://localhost:8000"
      scope="openid profile and email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
