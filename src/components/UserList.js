import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Container,
  Grid,
  CardActionArea,
  Button
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import GambarGeral from "./images/geral.jpg";

import { GolfCourse, Title } from "@material-ui/icons";


const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '5fcdfc858f7ef004033886f2';
export default class UserList extends Component {
    state = {
        data: [],
    }
	constructor() {
    super()
		axios.get(`${BASE_URL}/user`, { headers: { 'app-id': APP_ID } })
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
        <Display key={display.id} nama={display.title + "." + display.firstName + " " + display.lastName} 
        gambar={display.picture} email={display.email} /> )}
      </div>
    )
	}
}
function Display(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "230px",
      marginTop: 40,
      height: "400px",
      textAlign: "center",
      display: "inline-block"
    },
    img: {
      height: "auto",
      width: "160px",
      paddingTop: "200px",
      paddingLeft: 40,
      paddingRight: 30,
      backgroundColor: "red" // 16:9
    },
    imgHeader: {
      borderRadius: "50%",
      width: 50,
      height: 50,
    },
  }));

  const classes = useStyles();
  return (
    <div style={{display: "inline-block", margin: 22}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.img}
                    image={props.gambar}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.nama}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.email}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" variant="contained" color="primary">
                    View Profile
                    </Button>
                </CardActions>
            </Card>
          </Grid>
        </Grid>
    </div>
  );
}

