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
import Box from '@mui/material/Box';

// TODO(bllndalichako): Replace dummy data with real data
export const Profile = (props) => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  // const [toggle, setToggle] = useState("posts");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5555/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

  return <div>
    {/* TODO(bndalichako): Remove dummy data */}
    <Header />
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
                {/*<h1>{user.firstName} {user.lastName}</h1>*/}
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
              <button className="logout-button">Log Out</button>
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