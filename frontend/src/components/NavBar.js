import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav>
            <img className="navbar-logo"src="../swampysells-logo.png"></img>
            <input type="search" name="searchbar" id="searchBar" placeholder="Search Items"/>
            <Link to='/post'>
            <img className="navbar-icons"src="../add_post.png"></img>
                Post a Listing
            </Link>
            <Link to='/inbox'>
            <img className="navbar-icons"src="../inbox.png"></img>
                Inbox
            </Link>
            <Link to='/history'>
            <img className="navbar-icons"src="../history.png"></img>
                History
            </Link>
            <Link to='/profile'>
            <img className="navbar-icons"src="../profile.png"></img>
                Profile
            </Link>
        </nav>
    )
}