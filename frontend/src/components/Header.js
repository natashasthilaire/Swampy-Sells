import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';
import TypeAheadDropDown from './TypeAheadDropDown';
import locations from '../locations';
import dorms from "../locations";
import '../App.css'
var location = 'hey';

const Header = () => {
  const [email, setEmail] = useState(''); 
  const [location, setLocation] = useState('');
  /*useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch('http://localhost:5003/location');
      const json = await response.json()

      if (response.ok) {
        setLocation(json);
        console.log('inside of header: ',location)
      }
    }

    fetchLocation();
  }, [])
  */
  /*useEffect(() => {
    axios
      .get("http://localhost:5003/location")
      .then((res) => setLocation(res.data))
      .catch(err => {
       console.error(err);
  });
  }, []);
  */

  useEffect(() => {
    axios
      .get("http://localhost:5003/location")
      .then((res) => setLocation(res.data))
      .catch(err => {
       console.error(err);
  });
  }, []);



  return (
    <>
    <div style={{display:"flex", flexDirection:"row"}} >
      <a href='/home'><img class="home-logo" src="../swampysells-logo.png"></img></a>
      <div class="inline-div">
        <NavbarComp />
          <div class="item">
            <img src="../destination.png" style={{width:"15px", height:"20px", marginTop:"45px"}}></img>
            <span class="caption">{location}</span>
          </div>
          <div class="inline-div" style={{marginTop:"40px", marginLeft: "240px"}}>
              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../add_post.png" style={{width:"30px"}}></img>
                <a href='/post'><span class="caption">Post a Listing</span></a>
              </div>
              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../inbox.png" style={{width:"30px"}}></img>
                <a href='/inbox'><span class="caption">Inbox</span></a>
              </div>

              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../history.png" style={{width:"28px"}}></img>
                <a href='/history'><span class="caption">History</span></a>
              </div>

              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../profile.png" style={{width:"30px"}}></img>
                <a href='/profile'><span class="caption">Profile</span></a>
              </div>    
          </div>         
      </div>
    </div>
    <div style={{whiteSpace:"pre-wrap", display:"flex", flexDirection:"row", justifyContent:"space-evenly" }}> 
      <p><b><a href='/textbooks' style={{color:"black"}}>Textbooks{" "}</a></b></p>
      <p><b><a href='/clothes' style={{color:"black"}}>Clothes{" "}</a></b></p>
      <p><b><a href='/decor' style={{color:"black"}}>General Decor{" "}</a></b></p>
      <p><b><a href='/furniture' style={{color:"black"}}>Furniture{" "}</a></b></p>
      <p><b><a href='/appliances' style={{color:"black"}}>Appliances{" "}</a></b></p>
      <p><b><a href='/tickets' style={{color:"black"}}>Tickets{" "}</a></b></p>
    </div>

    </>
  );
};

export default Header;