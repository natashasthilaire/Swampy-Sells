import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup({ postItem }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{postItem.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className=''>
          <img className='img-fluid' src={postItem.image} alt='Not Available' />
          <p>Description: {postItem.description}</p>
          <p>Condition: {postItem.condition}</p>
          <p>Price: ${postItem.price}</p>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Delete
          </Button>
          <Button variant="primary">Sold</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;