import React, { Component } from "react";
import axios from "axios";
import APP_ID from "./key"

import DisplayCard from "./DisplayCard";

const BASE_URL = 'https://dummyapi.io/data/api';

export default class Beranda extends Component {
  state = {
    data: [],
  }
  constructor() {
    super()
    axios.get(`${BASE_URL}/post`, { headers: { 'app-id': APP_ID } })
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
          <DisplayCard key={display.id} idPost={display.id} idUser={display.owner.id} nama={display.owner.firstName + " " + display.owner.lastName}
            gambar={display.image} gambarProfile={display.owner.picture} tanggal={display.publishDate} like={display.likes}
            body={display.text} link={display.link} tag={display.tags} />)}
      </div>
    )
  }
}