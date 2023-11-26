import React, {useEffect, useState} from "react";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from "../context/AuthProvider";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Post = (props) => {
    const { user } = useAuth();
    const [image, setImage] = useState('');
    const [title, setTitle] = useState(''); 
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {}, [user]);

    const handleImageChange = async (event) => {
        const image = event.target.files[0]
        if (image == null)
            setImage('')
        else if (image.size <= (16 * 1024 * 1024))
            setImage(image)
        else
            toast.error('File cannot exceed 16 megabytes')
    }

    const submitPost = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('condition', condition);
        formData.append('description', description);
        formData.append('userId', user._id);
        formData.append('location', user.location);
    
        try {
            const response = await fetch('http://localhost:5003/api/item/:id', {
              method: 'POST',
              body: formData,
            });
            if (response.ok) {
               toast.success('Post successfully submitted')
               navigate('/home');
            } else {
                throw Error;
            }
        } catch (error) {
            console.error('Error uploading post:', error);
            toast.error('Error uploading post')
        }
    }

    return (
        <div>
            <Header />
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
                <input type="hidden" id="location" name="location" value={user.location} /*onSubmit={setLocation(user.location)}*/ />
                {console.log('this is user location: '+user.location)}
                <Button type="submit">Post Listing</Button>
            </Form>
        </div>
    )
}