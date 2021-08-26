import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BookForm from './BookForm';

class BookFormModal extends React.Component {



  render() {
    return (
      <Modal show={this.props.modalVisible} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>Add a book to your favorites!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm
            createBook={this.props.createBook}
            closeModal={this.props.closeModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default withAuth0(BookFormModal);