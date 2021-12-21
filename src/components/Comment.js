import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import APP_ID from "./key"
import Moment from 'moment';
import { Button, Link, CircularProgress, Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import profile_comment from "./images/account.png"

const BASE_URL = "https://dummyapi.io/data/v1";

const useStyles = makeStyles((theme) => ({
    image: {
        width: 60,
        marginTop: 10,
        borderRadius: "50%"
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
export default class Comments extends Component {
    state = {
        data: [],
    };

    handleComments = (X) => {
        axios
            .get(`${BASE_URL}/post/${X}/comment`, { headers: { "app-id": APP_ID } })
            .then((res) => {
                this.setState({ data: res.data.data });
            })
            .catch(console.error);
    };

    componentDidMount() {
        this.handleComments(this.props.id);
    }

    render() {
        return (
            this.state.data != '' ? (
                <div style={{ marginLeft: 0, paddingRight: 0 }}>
                    {/* {this.state.data.map(display =>
                        <Display key={display.id} idUser={display.owner.id} nama={display.owner.firstName + " " + display.owner.lastName}
                            komentar={display.message} tanggal={display.publishDate}
                            gambar={display.owner.picture} />)} */}
                    {this.state.data.map(display =>
                        <Display key={display.id} item={display} />)}
                    <Post />
                </div>
            ) : (
                <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: 10, marginBottom: 10 }}>
                    <CircularProgress />
                </Grid>
            )
        );
    }
}

function Post() {
    const [input1, setinput1] = useState("")
    const setInput = (a) => {
        setinput1(a.target.value)
    }
    return (
        <div style={{ padding: 20 }}>
            <form style={{ display: "flex", marginTop: 20 }} noValidate autoComplete="off">
                <img style={{ width: 50, borderRadius: "50%" }} src={profile_comment} />
                <TextField onChange={setInput} style={{ marginLeft: 10 }} id="standard-basic" placeholder="Comment as guest..." />
                <Button style={{ marginLeft: 10, marginTop: 10, height: 30, padding: 0, fontSize: 17, textTransform: "capitalize" }} size="small" variant="contained" color="primary">
                    <strong> Post </strong>
                </Button>
            </form>
        </div>
    )
}
function Display(props) {
    const classes = useStyles();
    const tanggal = Moment(props.item.publishDate).format('LLL')
    const nama = props.item.owner.firstName + " " + props.item.owner.lastName
    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex" }}>
                <Link href={`/userprofile/${props.item.owner.id}`}>
                    <img className={classes.image} src={props.item.owner.picture} />
                </Link>
                <p style={{ marginLeft: 10 }}><strong>{nama}</strong></p>
            </div>
            <p style={{ marginLeft: 70, marginTop: -30, borderBottom: "2px solid #5d5d5d" }}>{props.item.message}</p>
            <span style={{ fontSize: 12, float: "right", marginTop: -15 }}>{tanggal}</span>
        </div>
    )
}