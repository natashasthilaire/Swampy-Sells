import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import SearchInput from './SearchInput';

const Header = () => {
  const { user } = useAuth();

  useEffect(() => {
    
  }, [user]);

  return (
    <>
    <div style={{display:"flex", flexDirection:"row"}} >
      <Link to='/home'><img className="home-logo" src="../swampysells-logo.png"></img></Link>
      <div className="inline-div">
      <SearchInput />
          <div className="item">
            <img src="../destination.png" style={{width:"15px", height:"20px", marginTop:"45px"}}></img>
            <span className="caption">{user.location}</span>
          </div>
          <div className="inline-div" style={{marginTop:"40px", marginLeft: "240px"}}>
              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../home.png" style={{width:"28px"}}></img>
                <Link to='/home'><span className="caption">Home</span></Link>
              </div>
              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../add_post.png" style={{width:"30px"}}></img>
                <Link to='/post'><span className="caption">Post a Listing</span></Link>
              </div>
              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../inbox.png" style={{width:"30px"}}></img>
                <Link to='/inbox'><span className="caption">Inbox</span></Link>
              </div>
              <div style={{justifyContent:"center", textAlign:"center"}}>
                <img className="navbar-icons" src="../profile.png" style={{width:"30px"}}></img>
                <Link to='/profile'><span className="caption">Profile</span></Link>
              </div>    
          </div>         
      </div>
    </div>
    <div style={{whiteSpace:"pre-wrap", display:"flex", flexDirection:"row", justifyContent:"space-evenly" }}> 
      <p><b><Link to='/textbooks' style={{color:"black"}}>Textbooks{" "}</Link></b></p>
      <p><b><Link to='/clothes' style={{color:"black"}}>Clothes{" "}</Link></b></p>
      <p><b><Link to='/decor' style={{color:"black"}}>General Decor{" "}</Link></b></p>
      <p><b><Link to='/furniture' style={{color:"black"}}>Furniture{" "}</Link></b></p>
      <p><b><Link to='/appliances' style={{color:"black"}}>Appliances{" "}</Link></b></p>
      <p><b><Link to='/tickets' style={{color:"black"}}>Tickets{" "}</Link></b></p>
      <p><b><Link to='/other' style={{color:"black"}}>Other{" "}</Link></b></p>
    </div>

    </>
  );
};

export default Header;