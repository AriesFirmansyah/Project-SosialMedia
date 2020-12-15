import React, { Component } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "5fccd96ccecb8c26dadde5b8";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class UserProfile extends Component {
    state = {
        data: [],
        id: "",
    };

    handleData = (X) => {
        axios
            .get(`${BASE_URL}/user/${X}`, { headers: { "app-id": APP_ID } })
            .then((res) => {
                this.setState({ data: res.data });
            })
            .catch(console.error);
    };

    componentDidMount() {
        this.handleData(this.props.id);
    }

    render() {
        // this.setState({ id: this.props.id })
        console.log(this.props);
        return (
            <div>
                <Display data={this.state.data} />
            </div>
        );
    }
}

function Display(props) {
    const classes = useStyles();
    console.log(props);
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {props.data.id}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.data.firstName + " " + props.data.lastName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.data.dateOfBirth}
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default UserProfile;
