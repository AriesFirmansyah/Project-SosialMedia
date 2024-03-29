import React, { Component } from "react";
import axios from "axios";
import APP_ID from "./key"
import { Grid, CircularProgress } from "@material-ui/core";
import DisplayCard from "./DisplayCard";

const BASE_URL = 'https://dummyapi.io/data/v1';

export default class Beranda extends Component {
  state = {
    data: [],
  }
  constructor() {
    super()
    axios.get(`${BASE_URL}/post`, { headers: { 'app-id': APP_ID } })
      .then(res => {
        this.setState({ data: res.data.data })
      })
      .catch(console.error)
  }

  render() {
    return (
      this.state.data != '' ? (
        <div style={{ margin: "auto", textAlign: "center" }}>
          <Grid container direction="row" justify="space-between"
            alignItems="baseline" style={{marginTop: 10}}>
            {/* {this.state.data.map(display =>
              <DisplayCard key={display.id} idPost={display.id} idUser={display.owner.id} nama={display.owner.firstName + " " + display.owner.lastName}
                gambar={display.image} gambarProfile={display.owner.picture} tanggal={display.publishDate} like={display.likes}
                body={display.text} link={display.link} tag={display.tags} />)} */}
            {this.state.data.map(display =>
              <DisplayCard key={display.id} item={display}/>)}
          </Grid>
        </div>

      ) : (
        <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: 50 }}>
            <CircularProgress />
        </Grid>
      )
    )
  }
}