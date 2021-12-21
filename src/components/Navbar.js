import React from 'react'

import { NavLink } from 'react-router-dom';

import { Grid } from "@material-ui/core"

import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ViewListIcon from "@material-ui/icons/ViewList"
import HomeIcon from "@material-ui/icons/Home"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import SearchIcon from "@material-ui/icons/Search"

function Navbar() {
    return (
        <Grid item xs={12} style={{ marginTop: 4, textAlign: "center", float: "center" }}>
            <BottomNavigation style={{ width: "auto", textAlign: "center", borderRadius: 25, backgroundColor: "#d4d4d4" }} >
                <NavLink to="/beranda">
                    <BottomNavigationAction className="navigasi" label="Beranda" value="beranda" icon={<HomeIcon />} />
                </NavLink>
                <NavLink to="/userlist">
                    <BottomNavigationAction className="navigasi" label="User List" value="userlist" icon={<ViewListIcon />} />
                </NavLink>
                <NavLink to="/search">
                    <BottomNavigationAction className="navigasi" label="Search" value="search" icon={<SearchIcon />} />
                </NavLink>
                <NavLink to="/aboutus">
                    <BottomNavigationAction className="navigasi" label="About Us" value="aboutus" icon={<AccountCircleIcon />} />
                </NavLink>
            </BottomNavigation>
        </Grid>
    )
}

export default Navbar
