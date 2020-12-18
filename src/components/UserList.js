import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardActions, Grid, CardActionArea, Button, Link } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import APP_ID from "./key";
import SearchByName from "./SearchByName";

const BASE_URL = 'https://dummyapi.io/data/api';

export default class UserList extends Component {
  state = {
    data: [],
    search: "",
  }
  constructor() {
    super()
    axios.get(`${BASE_URL}/user?limit=30`, { headers: { 'app-id': APP_ID } })
      .then(res => {
        this.setState({ data: res.data.data })
      })
      .catch(console.error)
  }

  onchange = e => {
    this.setState({ search: e.target.value });
  }

  render() {
    const { search } = this.state;
    const filteredUser = this.state.data.filter(user => {
      return user.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    return (
      <div style={{ marginLeft: "auto", textAlign: "center" }}>
        <SearchByName onChange={this.onchange} />
        {filteredUser.map(display =>
          <Display key={display.id} idUser={display.id} nama={display.title + "." + display.firstName + " " + display.lastName}
            gambar={display.picture} email={display.email} />)}
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
      display: "inline-block",
      borderRadius: 25
    },
    img: {
      height: "auto",
      width: "160px",
      paddingTop: "200px",
      paddingLeft: 40,
      paddingRight: 30,
    },
    imgHeader: {
      borderRadius: "50%",
      width: 50,
      height: 50,
    },
    emailBreak: {
      wordWrap: "break-word",
    }
  }));

  const classes = useStyles();
  return (
    <div style={{ display: "inline-block", margin: 22 }}>
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
                <Typography className={classes.emailBreak} variant="body2" color="textSecondary" component="p">
                  {props.email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Grid container direction="row" justify="center" alignItems="flex-end">
                <Link href={`/userprofile/${props.idUser}`}>
                  <Button size="small" variant="contained" color="primary">
                    View Profile
                  </Button>
                </Link>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

