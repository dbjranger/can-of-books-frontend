import React from 'react';

import Header from './Header';
import Footer from './Footer';

import IsLoadingAndError from './IsLoadingAndError';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks';
import Profile from './Profile';


class App extends React.Component {

  render() {
    console.log('app', this.props.auth0);
    //move 2 lines to bestbooks.js
    const { user, isAuthenticated } = this.props.auth0;
    console.log(user);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <BestBooks /> : <Login />}
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
