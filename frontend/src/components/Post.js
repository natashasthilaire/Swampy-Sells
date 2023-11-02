import React, {useState} from "react";
import { NavBar } from "./NavBar";

export const Post = (props) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState(''); 
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const submitPost = (event) => {
        event.preventDefault();
    }

    function handleImageChange(event) {
        if (event.target.files[0] != null)
            setImage(URL.createObjectURL(event.target.files[0]));
        else
            setImage('')
    }

    return (
        <div>
             <NavBar/ >
            <h2>Post an Item</h2>
            <form className="addPost-form">
                <label>Upload Images of Item:</label>
                <input type="file" id="input" multiple accept="image/*" onChange={handleImageChange} />
                <img src={image} witdh="100" height="100" />
                <label htmlFor="text">Listing Title: </label>
                <input value = {title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Title" id="title" name="title"/>
                <label htmlFor="number">Price: </label>
                <input value={price} onChange={(event) => setPrice(event.target.value)} type="number"  placeholder="Price" id="price" name="price"/>
                <label htmlFor="text">Category: </label>
                <input value = {category} onChange={(event) => setCategory(event.target.value)} type="text" placeholder="Category" id="category" name="category"/>
                <label htmlFor="text">Description: </label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} type="text"  placeholder="Description" id="description" name="description">
                    Description
                </textarea>
                <p></p>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}