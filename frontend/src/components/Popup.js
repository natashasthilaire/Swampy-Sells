import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';

function Popup({ postItem, setPosts, userId }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleDelete = async () => {
    try {
      // delete item from database
      const deletePostRes = await axios.delete(`http://localhost:5003/api/deleteItem/${postItem._id}`);

      if (deletePostRes.status === 200) {
        const postsRes = await axios.get(`http://localhost:5003/api/item/:id/userItems/${userId}`);
        setPosts(postsRes.data);
        handleClose();
        toast.success('Item deleted');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting item');
    }
  }

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
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary">Sold</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;