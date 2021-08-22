import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';

import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Book from './Book';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksToRender: []
    }
  }

  componentDidMount = async () => {

    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    };
    try {
      const booksData = await axios.get("http://localhost:3001/books", config);
      console.log('it worked');
      this.setState({
        booksToRender: booksData.data
      });
      console.log(this.state.booksToRender);
    } catch (error) {
      console.log('Authentication error', error);
    }
  } 

  render() {

    console.log(this.state);

    const { user } = this.props.auth0;
    
    console.log(user);

    return (
      <>
        <Jumbotron id="jumbotron">
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          {this.state.booksToRender.length !== 0 && user ?
            <Book
              data={this.state.booksToRender}
            />
            : ''
          }
        </Jumbotron>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
