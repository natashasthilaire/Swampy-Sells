import Header from "./Header";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { bookmarks, posts } from "../DummyData"
import "../styles/Profile.css";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthProvider';
import { Buffer } from 'buffer';

// TODO(bllndalichako): Replace dummy data with real data
export const Profile = (props) => {
  const { user } = useAuth(); // get the current user
  const [listings, setListings] = useState(null)
  // const [user, setUser] = useState({});
  const { id } = useParams();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5555/users/${id}`)
  //     .then((res) => {
  //       setUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // get user posts
  useEffect(() => {
    const getListings = async () =>  {
      try {
        const responseWithPosts = await axios.get(`http://localhost:5003/api/item/:id/userItems/${user._id}`);
        setListings(responseWithPosts.data)

      } catch (error) {
        console.error(error)
      }
    }
    getListings()
  }, []);

  return <div>
    {/* TODO(bndalichako): Remove dummy data */}
    <Header />

    {/* show current users posts/listings
    <h2> {user.firstName}'s Listings</h2>
        <div> 
          { 
          listings ? (
          <div>
            {listings.map((listing, index) => (
              <div key={index}>
                <h1>{listing.title}</h1>
                <img src={`data:image/jpeg;base64,${Buffer.from(listing.image).toString('base64')}`} alt={'No Image Available'} />
              </div>
            ))}
          </div>
          ) : (
          <p>No Listings Found</p>
          )}
        </div> */}
    <div className="profile">
      <div className="view">
        <div className="info">
          <div className="top-info">
            <div className="profile-info">
              <img className="profile-img"
                src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                alt=""
              />
              <div className="identifiers">
                <h1 className="student-name">Gator Student</h1>
                <h1>{user.firstName} {user.lastName}</h1>
                <div className="activity">
                  {/*TODO(bndalichako): Remove constants*/}
                  <p>{user.postsCount} 23 items listed</p>
                  <p>{user.salesCount} 5 items sold</p>
                  <p>{user.purchasesCount} 9 items purchased</p>
                </div>
              </div>
            </div>
            <div className="profile-links">
              {/*TODO(bndalichako): Add logout functionality */}
              <Link to='/'><button className="logout-button" style={{backgroundColor:"lightgray", color:"blue"}}>Log Out</button></Link>
            </div>
          </div>
          <div className="bottom-info">
            <div className="headings">
              <h1 className="posts-heading">Posts</h1>
              <h1 className="bookmarks-heading">Bookmarks</h1>
            </div>
            <div className="posts">
              <div className="posts-list">
                {/*{user.bookmarks?.map((post) => (*/}
                {posts?.map((post) => (
                  <div className="postItem" key={post.id}>
                    <div className="post">
                      <img className="post-img"
                        src={post.image}
                        alt=""
                      />
                      <div className="post-info">
                        <p className="post-title">{post.title}</p>
                        <p className="post-price">{post.price}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bookmarks">
              <div className="bookmarks-list">
                {/*{user.bookmarks?.map((post) => (*/}
                {bookmarks?.map((post) => (
                  <div className="bookmark" key={post.id}>
                    <div className="post">
                      <img className="post-img"
                        src={post.image}
                        alt=""
                      />
                      <div className="post-info">
                        <p className="post-title">{post.title}</p>
                        <p className="post-price">{post.price}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
}