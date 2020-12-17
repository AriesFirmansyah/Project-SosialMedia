import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardHeader, CardContent, CardActions, Avatar, Container, Grid, Modal } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import axios from "axios";
import { Link } from "@material-ui/core";
import APP_ID from "./key"
import Moment from 'moment';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Comments from "./Comment"

const BASE_URL = 'https://dummyapi.io/data/api';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    marginTop: 40,
    height: 460, //460
    borderRadius: 25
  },
  img: {
    height: "auto",
    width: "auto",
    paddingTop: "56.25%", // 16:9

  },
  gambarHeader: {
    borderRadius: "50%",
    width: 50,
    height: 50
  },
  caption: {
    wordWrap: "break-word",
  },
  tags: {
    fontSize: 12,
  },
  display: {
    display: "inline-block", 
    margin: 10, 
    marginBottom: -38, 
    marginLeft: 0,
    align: "center"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },

}));

export default class Beranda extends Component {
  state = {
    data: [],
  }
  constructor() {
    super()
    axios.get(`${BASE_URL}/post`, { headers: { 'app-id': APP_ID  } })
      .then(res => {
        this.setState({ data: res.data.data })
        console.log(this.state.data)
      })
      .catch(console.error)
  }
  render() {
    return (
      <div style={{ margin: "auto", textAlign: "center" }}>
        {this.state.data.map(display =>
          <Display key={display.id} idPost={display.id} idUser={display.owner.id} nama={display.owner.firstName + " " + display.owner.lastName}
            gambar={display.image} gambarProfile={display.owner.picture} tanggal={display.publishDate} like={display.likes}
            body={display.text} link={display.link} tag={display.tags} />)}
      </div>
    )
  }
}

function Display(props) {
  const classes = useStyles();
  var tanggal = Moment(props.tanggal).format('LLLL')

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.display}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardHeader
              avatar={<img className={classes.gambarHeader} src={props.gambarProfile} />}
              title={props.nama}
              subheader={tanggal}>
            </CardHeader>
            <CardMedia className={classes.img} image={props.gambar} />
            <CardContent>
              <Grid container direction="row" justify="center" alignItems="center">
                {props.tag.map(displaytags =>
                  <Tags key={displaytags} tags={displaytags} />
                )}
              </Grid>
              <Typography className={classes.caption} style={{ textAlign: "justify", marginTop: 12 }} variant="body2" component="p">
                {props.body}
                <br />
                <a style={{ textTransform: "lowercase", textDecoration: "none" }} target="_blank" href={props.link}>
                  {props.link}
                </a>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton>
                <FavoriteIcon color="secondary" />
                <p style={{ fontSize: 13 }}> {props.like} Likes </p>
              </IconButton>
              <IconButton style={{marginTop: 3}}> 
                  <ModeCommentIcon onClick={handleOpen} /> 
                  <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.modal}
                    open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{
                    timeout: 500, }} >
                    <Fade in={open}>
                      <div className={classes.paper}>
                        <div style={{paddingLeft: 10, borderBottom: "3px solid #5d5d5d"}} >
                        <h2 id="transition-modal-title">Post Comments</h2>
                        </div>
                        <div>
                          <Comments key={props.idPost} id={props.idPost} />
                        </div>
                      </div>
                    </Fade>
                  </Modal>
              </IconButton>
              <IconButton style={{marginTop: 6}}>
                  <Link href={`userprofile/${props.idUser}`}> 
                    <AccountBoxIcon /> 
                  </Link>
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

function Tags(props) {
  const classes = useStyles();
  return (
    <Button style={{ padding: 0, fontSize: 12, textTransform: "lowercase" }} className={classes.tags} size="small" variant="text" color="primary">
      {"#" + props.tags}
    </Button>
  )
}

