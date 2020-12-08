import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Button, Card, CardHeader, CardContent, CardActions, Avatar, Container, Grid } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import axios from "axios";
import { LocationSearchingTwoTone } from "@material-ui/icons";

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '5fcdfc858f7ef004033886f2';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "250px",
    marginTop: 40,
    height: "auto",
  },
  img: {
    height: "auto",
    paddingTop: "56.25%", // 16:9
  },
  gambarHeader: {
    borderRadius: "50%",
    width: 50,
    height: 50
  }
}));

export default class Beranda extends Component{
  state = {
      data: [],
  }
constructor() {
  super()
  axios.get(`${BASE_URL}/post`, { headers: { 'app-id': APP_ID } })
    .then(res => {
      this.setState({data: res.data.data})
      console.log(this.state.data)
    })
    .catch(console.error)
}
render() {
  return (	
    <div style={{marginLeft: "auto", textAlign: "center"}}>
      {this.state.data.map(display => 
        <Display key={display.id} nama={display.owner.firstName + " " + display.owner.lastName} 
        gambar={display.image} gambarProfile={display.owner.picture} tanggal={display.publishDate} like={display.likes}
        body={display.text} link={display.link} tag={display.tags}/> )}
    </div>
  )
}
}
function Display(props) {
  const classes = useStyles();
  return (
    <div style={{display: "inline-block", margin: 22, align: "center"}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardHeader
              avatar={<img className={classes.gambarHeader} src={props.gambarProfile} />}
              title={props.nama}
              subheader={props.tanggal}>
            </CardHeader>
            <CardMedia className={classes.img} image={props.gambar} />
            <CardContent>
              <div>
                {props.tag.map(tes => 
                  <Tags key={tes} tes1={tes} />
                  )}
              </div>
              <Typography style={{textAlign: "justify"}} variant="body2" color="textSecondary" component="p">
                {props.body} <br></br>
                <a style={{textTransform: "lowercase", textDecoration: "none"}} target="_blank" href={props.link}>
                    {props.link}
                </a>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton>
                  <FavoriteIcon color="secondary" /> 
                  <p style={{fontSize: 13}}> {props.like} Likes </p> 
              </IconButton>
              <IconButton> <ModeCommentIcon /> </IconButton>
              <IconButton> <AccountBoxIcon /> </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

function Tags(props) {
  return (
    <Button style={{marginLeft: 10, marginBottom: 10}} size="small" variant="contained" color="primary">
      {props.tes1}
    </Button>
  )
}