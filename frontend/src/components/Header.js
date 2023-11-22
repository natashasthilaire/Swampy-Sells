import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import NavbarComp from '../components/NavbarComp';

const Header = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <>
    <div style={{display:"flex", flexDirection:"row"}} >
      <Link to='/home'><img className="home-logo" src="../swampysells-logo.png"></img></Link>
      <div className="inline-div">
        <NavbarComp />
          <div className="item">
            <img src="../destination.png" style={{width:"15px", height:"20px", marginTop:"45px"}}></img>
            <span className="caption">{user.location}</span>
          </div>
          <div className="inline-div" style={{marginTop:"40px", marginLeft: "240px"}}>
              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../add_post.png" style={{width:"30px"}}></img>
                <Link to='/post'><span className="caption">Post a Listing</span></Link>
              </div>
              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../inbox.png" style={{width:"30px"}}></img>
                <Link to='/inbox'><span className="caption">Inbox</span></Link>
              </div>

              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../history.png" style={{width:"28px"}}></img>
                <Link to='/history'><span className="caption">History</span></Link>
              </div>

              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../profile.png" style={{width:"30px"}}></img>
                <Link to='/profile'><span className="caption">Profile</span></Link>
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