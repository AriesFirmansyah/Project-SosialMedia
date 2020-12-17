import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid }from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Gambar1 from "./images/g1.png"
import Gambar2 from "./images/g2.png"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cont: {
    textAlign: "center",
    display: "inline-block",
    width: "230px",
    marginLeft: "160px",
    marginTop: "230px"
  }
});

function MediaCard(props) {
  const classes = useStyles();

  return (
    <div style={{display: "inline-block", margin: 22}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt=""
                height="150"
                image={props.gambar}
                title=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                <h4>About Us</h4>
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  <p className="Title">Jurusan : {props.jurusan}</p>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <p className="Title">Nama : {props.name}</p>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <p className="Title">Nim : {props.nim}</p>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

function MediaCall() {
  return (
    <div style={{marginLeft: "auto", textAlign: "center"}}> 
      <MediaCard jurusan="Informatika" name="Aries Firmansyah" gambar={Gambar1}  nim="00000037991" />
      <MediaCard jurusan="Informatika" name="Bonaventura Sanjaya" gambar={Gambar2} nim="00000038083" />
      <MediaCard jurusan="Informatika" name="Rahmandhika" gambar={Gambar1} nim="00000040733" />
    </div>
  )
}

export default MediaCall;