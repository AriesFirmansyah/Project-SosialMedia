import "./App.css"
import React from "react"
// import { Router } from "@reach/router"
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom'

import $ from "jquery"
import Search from "./components/Search"
import { Container, Grid, Switch, FormControlLabel } from "@material-ui/core"

import Gambar1 from "./components/images/logo.png"

/* PAGES */
import Beranda from "./components/Beranda"
import UserList from "./components/UserList"
import AboutUs from "./components/AboutUs"
import UserProfile from "./components/UserProfile"
import Tags from "./components/Tags"
import SearchByName from "./components/SearchByName"
import Navbar from "./components/Navbar"


function App() {
  let { id } = useParams();
  return (
    <Router>
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
            <Navbar/>
          </Grid>

          <Routes>
            <Route path="/" element={<Beranda/>}> </Route>
            <Route path="/beranda" element={<Beranda/>}> </Route>
            <Route path="/userlist" element={<UserList/>}>  </Route>
            <Route path="/aboutus" element={<AboutUs/>}> </Route>
            <Route path="/search" element={<Search/>}> </Route>
            <Route path="/search/byname" element={<SearchByName/>}> </Route>
            <Route path="/search/tag/:id" element={<Tags/>}></Route>
            <Route path="/userprofile/:id" element={<UserProfile/>}> </Route>
          </Routes>

          {/* <Router>
            <Beranda path="/"></Beranda>
            <Beranda path="/beranda"></Beranda>
            <UserList path="/userlist"></UserList>
            <AboutUs path="/aboutus/"></AboutUs>
            <Search path="/search"></Search>
            <SearchByName path="/search/byname"></SearchByName>
            <Tags path="/search/tag/:id"></Tags>
            <UserProfile path="/userprofile/:id"></UserProfile>
          </Router> */}
        </Container>
      </div>
    </Router>
  );
}

function switchDisplay() {
  $("#cont").toggleClass("contSwitch");
  $("body").toggleClass("bodySwitch");
}
export default App;