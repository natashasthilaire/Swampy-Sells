import Header from "./Header";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { bookmarks, posts } from "../DummyData"
import "../styles/Profile.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthProvider';
import { Buffer } from 'buffer';
import { useNavigate} from "react-router-dom";


// TODO(bllndalichako): Marking an item sold and deleting it.
// TODO(bllndalichako): Mark item sold
// TODO(bllndalichako): Delete item
// TODO(bllndalichako): Item pop up when user clicks on item
// TODO(bllndalichako): User upload profile picture
// TODO(bllndalichako): Bookmarking.
export const Profile = (props) => {
  const { user } = useAuth(); // get the current user
  const [listings, setListings] = useState(null)
  // const [user, setUser] = useState({});
  const { id } = useParams();
  // const [toggle, setToggle] = useState("posts");
  const [value, setValue] = React.useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleLogout = async (event) => {
    console.log('Logout button clicked');
    try {
      event.preventDefault();
      await logout();
      console.log('Logout successful');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

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
                <h1>{user.firstName} {user.lastName}</h1>
                <div className="activity">
                  <p>{listings? listings.length : 0} items listed</p>
                  {/*TODO(bndalichako): Backend logic for determining vals below*/}
                  <p>{user.salesCount} 5 items sold</p>
                  <p>{user.purchasesCount} 9 items bookmarked</p>
                </div>
              </div>
            </div>
            <div className="profile-links">
              {/*TODO(bndalichako): Add logout functionality */}
              <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
          <div className="bottom-info">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Posts" {...a11yProps(0)} />
                <Tab label="Bookmarks" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} className="posts">
              <div className="posts-list">
                {/*{user.bookmarks?.map((post) => (*/}
                {listings?.map((post) => (
                  <div className="postItem" key={post.id}>
                    <div className="post">
                      <img className="post-img"
                        src={`data:image/jpeg;base64,${Buffer.from(post.image).toString('base64')}`} alt={'Not Available'}
                      />
                      <div className="post-info">
                        <p className="post-title">{post.title}</p>
                        <p className="post-price">${post.price}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} className="bookmarks">
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
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  </div>
}