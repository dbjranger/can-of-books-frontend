import React from "react";
import Header from "./Header";
import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BestBooks from "./BestBooks";
import Login from "./Login";
import Logoutbutton from "./Logoutbutton";
import Profile from "./Profile";
import axios from 'axios';

import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {
  makeRequest = async() => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log('jwt: ', jwt);
    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`},
    };

    const serverResponse = await axios.get('http://localhost:3001/test-login', config);

    console.log('it worked if data:  ', serverResponse);
  }
  
  render() {
    console.log("app", this.props.withAuth0);
    const { user, isLoading, isAuthenticated } = this.props.auth0;

    if (isLoading) {
      return <h2>Coming right up!</h2>;
    } else {
      return (
        <>
          <Router>
            <IsLoadingAndError>
              <Header />
              <Switch>
                <Route exact path="/">
                  {user ? <BestBooks /> : <Login />}
                  {user ? <Logoutbutton />: ''}
                </Route>
                
                <Route exact path="/profile">
                  {user ? <Profile /> : ''}
                </Route>
              </Switch>
              <Footer />
            </IsLoadingAndError>
          </Router>
        </>
      );
    }
  }
}

export default withAuth0(App);
