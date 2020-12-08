import "./App.css";
import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import $ from "jquery";

/* PAGES */
import Beranda from "./components/Beranda";
import UserList from "./components/UserList"
import AboutUs from "./components/AboutUs";

import { Button, makeStyles, Container, Grid, Switch, FormControlLabel, Link, } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ViewListIcon from "@material-ui/icons/ViewList";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import Gambar1 from "./components/images/g1.png"


const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "5fccd96ccecb8c26dadde5b8";

function App() {
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/user`, { headers: { "app-id": APP_ID } })
      .then(({ data }) => setDatas(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  console.log(datas);
  return (
    <div id="cont" className="cont">
      <Container id="" maxWidth="md">
        <Grid container spacing={3}>
          <Grid className="textRight" item xs={12}>
            <div style={{ float: "left", marginTop: "-12px" }}>
              <h2><img className="logo" src={Gambar1} />Sausmed</h2>
            </div>
            <p className="inline" style={{ marginRight: 12, fontSize: 12 }}>
              Light
            </p>
            <FormControlLabel
              onChange={switchDisplay}
              control={<Switch color="primary" />}
            />
            <p className="inline" style={{ marginLeft: -17, fontSize: 12 }}>
              Dark
            </p>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 4 }}>
            <BottomNavigation style={{ width: "auto", borderRadius: 10, backgroundColor: "#d4d4d4" }} >
              <Link href="/beranda">
                <BottomNavigationAction className="navigasi" label="Beranda" value="beranda" icon={<HomeIcon />} />
              </Link>
              <Link href="/userlist">
                <BottomNavigationAction className="navigasi" label="User List" value="userlist" icon={<ViewListIcon />} />
              </Link>
              <Link href="/userlist">
                <BottomNavigationAction className="navigasi" label="Search" value="search" icon={<SearchIcon />} />
              </Link>
              <Link href="/aboutus">
                <BottomNavigationAction className="navigasi" label="About Us" value="aboutus" icon={<AccountCircleIcon />} />
              </Link>
            </BottomNavigation>
          </Grid>
        </Grid>
        <Router>
          <Beranda path="/beranda"></Beranda>
          <UserList path="/userlist"></UserList>
          <AboutUs path="/aboutus"></AboutUs>
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