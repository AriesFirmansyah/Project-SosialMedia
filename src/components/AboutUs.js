import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {  Grid } from "@material-ui/core";
import aris from "./images/aris.jpg"
import bona from "./images/bona.jpg"
import dika from "./images/dika.jpg"
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import instagram from './images/instagram.png'
import github from './images/github.png'
import "./../App.css"

const aris_desc = "Hello, I'm Aries. I am undergraduate informatics student at Multimedia Nusantara University."
const bona_desc = "Hello, I'm Bona. I am undergraduate informatics student at Multimedia Nusantara University."
const dika_desc = "Hello, I'm Dika. I am undergraduate informatics student at Multimedia Nusantara University."

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  cont: {
    textAlign: "center",
    display: "inline-block",
    width: "230px",
    marginLeft: "160px",
    marginTop: "230px"
  },
  root: {
    flexGrow: 1,
    marginBottom: 70
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: "100%",
    textAlign: "center",
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 25,
  },
  image: {
    width: 192,
    height: 192,
    cursor: "default",
    marginTop: 10
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: 220,
    maxHeight: 200,
    width: "220px",
    height: "200px",
    borderRadius: 5,
    float: "right"
  },
  ikon: {
    width: 30,
    marginBottom: -11
  },
}));

function MediaCard(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="Loading. ." src={props.gambar} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm={7} container style={{ textAlign: "left" }}>
          <Grid item xs container direction="column">
            <Grid item xs>
              <h2 style={{ marginTop: 3 }}>{props.name}</h2>
              <p>{props.desc}</p>
              <code><i>NIM : {props.nim}</i></code>
              <div style={{ display: "flex", marginTop: 20, borderBottom: "1px solid #707070" }}>
                {/* <a href={props.linkedin} alt="Linkedin" target="_blank" class="p1"><img src={linkedin} /></a> */}
                <a href={props.ig} alt="instagram" target="_blank" class="p2"><img src={instagram} /></a>
                <a href={props.github} alt="github" target="_blank" class="p3"><img src={github} /></a>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
function MediaCall() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} variant="outlined">
      <div style={{ marginLeft: "auto", textAlign: "center" }}>
        <MediaCard  ig="https://www.instagram.com/ariesfirmansyah_/"
          github="https://github.com/AriesFirmansyah" desc={aris_desc} name="Aries Firmansyah" gambar={aris} nim="00000037991" />
        <MediaCard ig="https://www.instagram.com/bonbonzay/"
          github="https://github.com/ayaayawae" desc={bona_desc} name="Bonaventura Sanjaya" gambar={bona} nim="00000038083" />
        <MediaCard ig="https://www.instagram.com/rhmndhika/"
          github="https://github.com/rhmndhika" desc={dika_desc} name="Rahmandhika" gambar={dika} nim="00000040733" />
      </div>
    </Paper>
  )
}

export default MediaCall;