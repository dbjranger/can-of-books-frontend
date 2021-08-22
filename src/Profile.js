import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends React.Component {
  render() {
    const { isAuthenticated, user } = this.props.auth0;
    if (isAuthenticated) {
      return (
        <div id="profile">
          <h3>Profile</h3>
          <img alt={user.name} src={user.picture} />
          <div className='userName'>
            <h4>Name:</h4> <p>{user.name}</p>
          </div>
          <div className='userEmail'>
            <h4>E-mail:</h4> <p>{user.email}</p>
          </div>
        </div>
      )
    } else {
      return (
        <h4>Please login to view your profile.</h4>
      )
    }
  }
}

export default withAuth0(Profile);