import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksToRender: [],
      modalVisible: false,
      updating: false,
      selectedBook: null
    }
  }


  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  showUpdateModal = (book) => {
    this.setState({
      modalVisible: true,
      updating: true,
      selectedBook: book
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
      updating: false
    })
  }

  componentDidMount = async () => {

    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    const config = {
      headers: { authorization: `Bearer ${jwt}` },
      params: { email: this.props.auth0.user.email },
    };
    try {
      const booksData = await axios.get(`${process.env.REACT_APP_SERVER}/books`, config);
      this.setState({
        booksToRender: booksData.data
      });
    } catch (error) {
      console.log(error.response.status, error.message);
    }
  }

  createBook = async (title, description) => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    const config = {
      headers: { authorization: `Bearer ${jwt}` },
      params: {
        "title": title,
        "description": description,
        "status": "favorite",
        "email": this.props.auth0.user.email
      }
    };
    try {
      let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, config);
      let createdBookData = response.data;     
      this.setState({
        booksToRender: [...this.state.booksToRender, createdBookData]
      })
    } catch (error) {
      console.log('Authenitcation error', error.message);
    };
  }

  updateBook = async (book) => {

    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: { authorization: `Bearer ${jwt}` },
      params: {
        "title": book.title,
        "description": book.description,
        "status": book.status,
        "email": this.props.auth0.user.email
      }
    };
    try {
      await axios.put(`${process.env.REACT_APP_SERVER}/books/${book._id}`, config);

      const updatedBooksArr = this.state.booksToRender.map(oldBook => {
        if (oldBook._id === book._id) {
          return book;
        } else {
          return oldBook;
        }
      });

      this.setState({
        booksToRender: updatedBooksArr
      })

    } catch (error) {
      console.log(error.response.status, error.message);
    }
  }

  handleDelete = async (id) => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;    
    const config = {
      headers: { authorization: `Bearer ${jwt}` },
      params: { email: this.props.auth0.user.email }
    };

    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/books/${id}`, config);

      let remainingBooks = this.state.booksToRender.filter(book => book._id !== id);
      this.setState({
        booksToRender: remainingBooks
      })    
    }
    catch (error) {
      console.log(error.response.status, error.message);
    }
  }

  render() {
    let booksData = this.state.booksToRender.map((book) => (
      <Carousel.Item
        key={book._id}>
        <img
          className=".d-block w-100"
          src="https://www.publicdomainpictures.net/pictures/260000/velka/abstract-background-books.jpg"
          alt="slide"
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <div id="carouselBtn">
            <Button variant="info" onClick={() => this.showUpdateModal(book)}>Update</Button>
            <Button variant="danger" onClick={() => this.handleDelete(book._id)}>Delete</Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    ))
    return (
      <>
        <Jumbotron id="jumbotron">
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          {this.state.booksToRender.length !== 0 ?
            <Container >
              <Carousel id="carousel" >
                {booksData}
              </Carousel>
            </Container>
            : ''}
          <Button variant="success" onClick={this.showModal}>Add new book
          </Button>
        </Jumbotron>
        <BookFormModal
          modalVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          createBook={this.createBook}
          updating={this.state.updating}
          selectedBook={this.state.selectedBook}
          updateBook={this.updateBook}
        />
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);