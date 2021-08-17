import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  
  makeRequest = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = { headers: {"Authorization": `Bearer ${jwt}` } };
  const serverResponse = await axios.get('https://localhost:3001/test')
  };
  
  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <button onCLick={this.makeRequest}>Start Here</button>
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
