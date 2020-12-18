import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid } from "@material-ui/core";

import APP_ID from "./key";
import axios from "axios";

import DisplayCard from "./DisplayCard";

const BASE_URL = 'https://dummyapi.io/data/api';

const options = ['animal', 'dog', 'cat', 'pet', 'mammal', 'puppy', 'human', 'beach',
    'nature', 'plant', 'mountain', 'ocean', 'outdoors', 'field', 'sunset']

export default class Search extends Component {
    state = {
        data: [],
        value: options[0],
        inputValue: ''
    };

    handleSearch = (X) => {
        axios
            .get(`${BASE_URL}/tag/${X}/post`, { headers: { "app-id": APP_ID } })
            .then((res) => {
                this.setState({ data: res.data.data });
            })
            .catch(console.error);
    };

    componentDidMount() {
        this.handleSearch(this.props.id);
        this.setState({ value: this.props.id })
    }

    render() {
        return (
            <div style={{ textAlign: "center", margin: "auto" }}>
                <div style={{ marginTop: 10 }}>
                    {/* <div>{`value: ${this.state.value !== null ? `'${this.state.value}'` : 'null'}`}</div> */}
                    <Grid container direction="row" justify="center" alignItems="center">
                        <h3>Tags:</h3>
                        <Autocomplete
                            value={this.state.value}
                            onChange={(event, newValue) => {
                                this.setState({ value: newValue })
                                this.handleSearch(newValue);
                            }}
                            size="small"
                            id="controllable-states-demo"
                            autoComplete
                            options={options}
                            style={{ width: 150, marginLeft: 15 }}
                            renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
                        />
                    </Grid>
                </div>
                <Grid container direction="row" justify="flex-start" alignItems="baseline" style={{marginTop: 10}}>
                    {this.state.data.map(display =>
                        <DisplayCard key={display.id} idPost={display.id} idUser={display.owner.id} nama={display.owner.firstName + " " + display.owner.lastName}
                            gambar={display.image} gambarProfile={display.owner.picture} tanggal={display.publishDate} like={display.likes}
                            body={display.text} link={display.link} tag={display.tags} />)}
                </Grid>
            </div>
        );
    }
}