import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CardHeader } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import APP_ID from "./key"
import Moment from 'moment';
import id_picture from "./images/id.png"
import gender_picture from "./images/gender.png"
import birthdate_picture from "./images/birthdate.png"
import email_picture from "./images/email.png"
import phone_picture from "./images/phone.png"
import register_picture from "./images/register.png"

const BASE_URL = "https://dummyapi.io/data/api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 15,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: "100%",
        borderRadius: 10,
        textAlign: "center",
        borderRadius: 25,
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
        maxWidth: 192,
        maxHeight: 192,
        width: "100%",
        height: "100%",
        borderRadius: 5,
    },
    ikon : {
        width: 30, 
        marginBottom: -11
    }
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
    const tanggal_lahir = Moment(props.data.dateOfBirth).format('LL')
    const tanggal_regis = Moment(props.data.registerDate).format('LL')
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="Loading. ." src={props.data.picture} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm={7} container style={{textAlign: "left"}}>
                        <Grid item xs container direction="column">
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <strong>{props.data.title + ". " + props.data.firstName + " " + props.data.lastName}</strong>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <p alt="loading . .">
                                        <img className={classes.ikon} src={id_picture} /> ID : {props.data.id}
                                    </p>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                   <p> 
                                        <img className={classes.ikon} src={gender_picture} /> Gender : {props.data.gender}
                                    </p> 
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p> 
                                        <img className={classes.ikon} src={birthdate_picture} /> Birth Date : {tanggal_lahir}
                                    </p> 
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p> 
                                        <img className={classes.ikon} src={register_picture} /> Register Date : {tanggal_regis}
                                    </p> 
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p> 
                                        <img className={classes.ikon} src={email_picture} /> Email : {props.data.email}
                                    </p> 
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p> 
                                        <img className={classes.ikon} style={{height: 27}} src={phone_picture} /> Phone : {props.data.phone}
                                    </p>     
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
    const tanggal = Moment(props.tanggal).format('LLLL')
    return (
        <div style={{ display: "inline-block", margin: 22, align: "center" }}>
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
            {"#" + props.tes1}
        </Button>
    )
}

export default UserProfile;
