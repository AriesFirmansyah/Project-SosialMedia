import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import APP_ID from "./key"
import Moment from 'moment';
import id_picture from "./images/id.png"
import gender_picture from "./images/gender.png"
import birthdate_picture from "./images/birthdate.png"
import email_picture from "./images/email.png"
import phone_picture from "./images/phone.png"
import register_picture from "./images/register.png"

import DisplayCard from "./DisplayCard";

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
    ikon: {
        width: 30,
        marginBottom: -11
    },
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
        return (
            <div>
                <UserDetail data={this.state.data} />
                <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: 10 }}>
                    {this.state.dataPost.map(display =>
                        <DisplayCard key={display.id} idPost={display.id} idUser={display.owner.id} nama={display.owner.firstName + " " + display.owner.lastName}
                            gambar={display.image} gambarProfile={display.owner.picture} tanggal={display.publishDate} like={display.likes}
                            body={display.text} link={display.link} tag={display.tags} />)}
                </Grid>
            </div>
        );
    }
}

function UserDetail(props) {
    const classes = useStyles();
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
                    <Grid item xs={12} sm={7} container style={{ textAlign: "left" }}>
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
                                        <img className={classes.ikon} src={register_picture} /> Registration Date : {tanggal_regis}
                                    </p>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p>
                                        <img className={classes.ikon} src={email_picture} /> Email : {props.data.email}
                                    </p>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <p>
                                        <img className={classes.ikon} style={{ height: 27 }} src={phone_picture} /> Phone : {props.data.phone}
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

export default UserProfile;
