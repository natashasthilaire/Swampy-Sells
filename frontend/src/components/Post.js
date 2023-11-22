import React, {useState} from "react";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Post = (props) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState(''); 
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [ShowConfirmation, setShowConfirmation] = useState(false);

    const handleImageChange = async (event) => {
        setImage(event.target.files[0])
    }

    const submitPost = async (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Header />
            {ShowConfirmation ? (
            <div>Post successfully submitted</div>
            ) : (
            <Form className="addPost-form" onSubmit={submitPost}>
                <h2>Post a Listing</h2>
                <Form.Group controlId="formFile" className="mb-2" src="../image,png">
                    <Form.Label>Add Photo</Form.Label>
                    <Form.Control type="file" name="file" onChange={(event) => handleImageChange(event)} accept="image/*" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Listing Title</Form.Label>
                    <Form.Control value={title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Listing title" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="number">Price</Form.Label>
                    <Form.Control value={price} onChange={(event) => setPrice(event.target.value)} type="number" placeholder="Enter price" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={category} onChange={(event) => setCategory(event.target.value)} required>
                        <option value="" disabled>Choose Category</option>
                        <option value="Textbooks">Textbooks</option>
                        <option value="Clothes">Clothes</option>
                        <option value="General Decor">General Decor</option> 
                        <option value="Furniture">Furniture</option>
                        <option value="Appliances">Appliances</option>
                        <option value="Tickets">Tickets</option>
                        <option value="Other">Other</option>           
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Condition</Form.Label>
                    <Form.Select value={condition} onChange={(event) => setCondition(event.target.value)} required>
                        <option value="" disabled>Choose Condition</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Used">Used</option>          
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={description} onChange={(event) => setDescription(event.target.value)} 
                        as="textarea" rows={3} maxLength={150} placeholder="Description" required/>
                </Form.Group>
                <Button type="submit">Post Listing</Button>
            </Form>
            )}
        </div>
    )
}