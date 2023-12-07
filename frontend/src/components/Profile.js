import Header from "./Header";
import React from "react";
import { useQuery} from 'react-query'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { bookmarks } from "../DummyData"
import { Link } from "react-router-dom";
import "../styles/Profile.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthProvider';
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import Popup from "./Popup";


// TODO(bllndalichako): Marking an item sold and deleting from homepage. (4)
// TODO(bllndalichako): Bookmarking. (1)
export const Profile = (props) => {
  const { user } = useAuth(); // get the current user
  const [listings, setListings] = useState(null)
  const [bookmarks, setBookmarks] = useState(null)
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
    const getListings = async () => {
      try {
        const responseWithPosts = await axios.get(`http://localhost:5003/api/item/:id/userItems/${user._id}`);
        setListings(responseWithPosts.data)

      } catch (error) {
        console.error(error)
      }
    }

    const getBookmarks = async () =>  {
      try {
        const itemsRes = await axios.get('http://localhost:5003/getItems');
        const userBookmarks = itemsRes.data.filter((item) => item.bookmarkedBy?.includes(user?._id));

        setBookmarks(userBookmarks)
        console.log(userBookmarks)
      } catch (error) {
        console.error(error)
      }
    }

    getListings()
    getBookmarks()
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
    <Header />
    <div className="profile">
      <div className="view">
        <div className="info">
          <div className="top-info">
            <div className="profile-info">
              <Avatar className="profile-img" sx={{ bgcolor: deepOrange[300], fontSize: "4.5rem" }}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
              <div className="identifiers">
                <h1>{user.firstName} {user.lastName}</h1>
                <div className="activity">
                  <p>{listings ? listings.length : 0} items listed</p>
                  {/*TODO(bndalichako): Backend logic for determining vals below*/}
                  <p>{listings ? listings.filter(item => item.sold).length : 0} items sold</p>
                  <p>{bookmarks? bookmarks.length : 0} items bookmarked</p>
                </div>
              </div>
            </div>
            <div className="profile-links">
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
                {listings?.map((post) => (        
                  <div className="postItem" key={post.id}>
                    <div className="post">
                      <img className="post-img"
                        src={post.image} alt={'Not Available'}
                      />
                        {post.sold ? <p className="fs-3 text-danger">Sold</p> : <p className="fs-3 text-success">Available</p>}
                        
                      <div className="post-info">
                        <p className="post-title">{post.title}</p>
                        <p className="post-price">${post.price}</p>
                      </div>
                      <Popup postItem={post} setPosts={setListings} userId={user._id} />
                    </div>
                  </div>
                ))}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} className="bookmarks">
              <div className="bookmarks-list">
                {bookmarks?.map((post) => (
                  <div className="bookmark" key={post.id}>
                    <Link to={`/item/${post._id}`}>
                    <div className="post">
                      <img className="post-img"
                        src={post.image}
                        alt=""
                      />
                      <div className="post-info">
                        <p className="post-title">{post.title}</p>
                        <p className="post-price">${post.price}</p>
                        <p className="post-price">{post.location}</p>
                      </div>
                    </div>
                    </Link>
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