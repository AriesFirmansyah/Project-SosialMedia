import React, { Component } from "react";
import axios from "axios";

// import Display from "./Display";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

import { CardHeader, Avatar, Container } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";


const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "5fccd96ccecb8c26dadde5b8";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: "100%",
        borderRadius: 10,
        textAlign: "center",
    },
    image: {
        width: 192,
        height: 192,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: 192,
        maxHeight: 192,
        width: "100%",
        height: "100%",
    },
}));

const useStyles1 = makeStyles((theme) => ({
    root: {
        width: "250px",
        marginTop: 40,
        height: "auto",
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
    }

}));

class UserProfile extends Component {
    state = {
        data: [],
        id: "",
        dataPost: [],
    };

    handleData = (X) => {
        axios
            .get(`${BASE_URL}/user/${X}`, { headers: { "app-id": APP_ID } })
            .then((res) => {
                this.setState({ data: res.data });
            })
            .catch(console.error);
    };

    handleDataPost = (X) => {
        axios
            .get(`${BASE_URL}/user/${X}/post`, { headers: { "app-id": APP_ID } })
            .then((res) => {
                this.setState({ dataPost: res.data.data });
            })
            .catch(console.error);
    };

    componentDidMount() {
        this.handleData(this.props.id);
        this.handleDataPost(this.props.id);
    }

    render() {
        // this.setState({ id: this.props.id })
        console.log(this.props);
        return (
            <div>
                <UserDetail data={this.state.data} />
                <div style={{ marginLeft: "auto", textAlign: "center" }}>
                    {this.state.dataPost.map(display =>
                        <Display key={display.id} idPost={display.id} idUser={display.owner.id} nama={display.owner.firstName + " " + display.owner.lastName}
                            gambar={display.image} gambarProfile={display.owner.picture} tanggal={display.publishDate} like={display.likes}
                            body={display.text} link={display.link} tag={display.tags} />)}
                </div>
            </div>
        );
    }
}

function UserDetail(props) {
    const classes = useStyles();
    console.log(props);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={props.data.picture} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm={7} container>
                        <Grid item xs container direction="column">
                            <Grid item xs>
                                <Typography variant="body2" color="textSecondary">
                                    {props.data.id}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    <strong>{props.data.title + ". " + props.data.firstName + " " + props.data.lastName}</strong>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.data.gender}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.data.dateOfBirth}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.data.email}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.data.phone}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

function Display(props) {
    const classes = useStyles1();
    return (
        <div style={{ display: "inline-block", margin: 22, align: "center" }}>
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
                            <Grid container direction="row" justify="center" alignItems="center">
                                {props.tag.map(tes =>
                                    <Tags key={tes} tes1={tes} />
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
                            <IconButton> <ModeCommentIcon /> </IconButton>
                            {/* <IconButton><Link href={
                  {
                    pathname: `/userprofile/${props.idUser}`,
                    state: {
                      id: props.idUser
                    }
                  }
                }> <AccountBoxIcon /> </Link></IconButton> */}
                            {/* <IconButton><Link href={`userprofile/${props.idUser}`}> <AccountBoxIcon /> </Link></IconButton> */}
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
        <Button style={{ padding: 0 }} className={classes.tags} size="small" variant="text" color="primary">
            {"#" + props.tes1}
        </Button>
    )
}

export default UserProfile;
