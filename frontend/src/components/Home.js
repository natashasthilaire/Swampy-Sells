import React from 'react';
import NavbarComp from '../components/NavbarComp';
//import '../App.css'

const Home = () => {
  return (
    <>
    <div style={{display:"flex", flexDirection:"row"}} >
      <img class="home-logo" src="../swampysells-logo.png"></img>
      <div class="inline-div">
      <NavbarComp />
        <div class="item">
          <img src="../destination.png" style={{width:"15px", height:"20px"}}></img>
          <span class="caption">Riker Hall</span>
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

export default Home;