import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
// import Book from './Book';

class Book extends React.Component {

  render() {
    const { user } = this.props.auth0;

    return (
      <>
          <h1>{this.props.book.name}</h1>
          <p>
            {this.props.book.description}
          </p>
      </>
    )
  }
}

export default withAuth0(Book);