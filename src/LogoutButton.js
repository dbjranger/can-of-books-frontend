// Auth0 docs 
// https://auth0.com/docs/quickstart/spa/react#add-logout-to-your-application

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="info" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;