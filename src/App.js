import "./App.css"
import React from "react"
import { Router } from "@reach/router"
import $ from "jquery"
import Search from "./components/Search"
import { Container, Grid, Switch, FormControlLabel, Link } from "@material-ui/core"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ViewListIcon from "@material-ui/icons/ViewList"
import HomeIcon from "@material-ui/icons/Home"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import SearchIcon from "@material-ui/icons/Search"
import Gambar1 from "./components/images/logo.png"

/* PAGES */
import Beranda from "./components/Beranda"
import UserList from "./components/UserList"
import AboutUs from "./components/AboutUs"
import UserProfile from "./components/UserProfile"
import Tags from "./components/Tags"
import SearchByName from "./components/SearchByName"


function App() {
  return (
    <div id="cont" className="cont">
      <Container id="" maxWidth="md">
        <Grid container spacing={3}>
          <Grid className="textRight" item xs={12}>
            <div style={{ float: "left", marginTop: "-12px" }}>
              <h2><img className="logo" src={Gambar1} />Sausmed</h2>
            </div>
            <p className="inline" style={{ marginRight: 12, fontSize: 12, fontWeight: "bold" }}>
              Light
            </p>
            <FormControlLabel
              onChange={switchDisplay}
              control={<Switch color="primary" />}
            />
            <p className="inline" style={{ marginLeft: -17, fontSize: 12, fontWeight: "bold" }}>
              Dark
            </p>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 4, textAlign: "center", float: "center" }}>
            <BottomNavigation style={{ width: "auto", textAlign: "center", borderRadius: 25, backgroundColor: "#d4d4d4" }} >
              <Link href="/beranda">
                <BottomNavigationAction className="navigasi" label="Beranda" value="beranda" icon={<HomeIcon />} />
              </Link>
              <Link href="/userlist">
                <BottomNavigationAction className="navigasi" label="User List" value="userlist" icon={<ViewListIcon />} />
              </Link>
              <Link href="/search">
                <BottomNavigationAction className="navigasi" label="Search" value="search" icon={<SearchIcon />} />
              </Link>
              <Link href="/aboutus">
                <BottomNavigationAction className="navigasi" label="About Us" value="aboutus" icon={<AccountCircleIcon />} />
              </Link>
            </BottomNavigation>
          </Grid>
        </Grid>
        <Router>
          <Beranda path="/"></Beranda>
          <Beranda path="/beranda"></Beranda>
          <UserList path="/userlist"></UserList>
          <AboutUs path="/aboutus/"></AboutUs>
          <Search path="/search"></Search>
          <SearchByName path="/search/byname"></SearchByName>
          <Tags path="/search/tag/:id"></Tags>
          <UserProfile path="/userprofile/:id"></UserProfile>
        </Router>
      </Container>
    </div>
  );
}

function switchDisplay() {
  $("#cont").toggleClass("contSwitch");
  $("body").toggleClass("bodySwitch");
}
export default App;