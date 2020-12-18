import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Container, Grid } from "@material-ui/core";
import { Button, Link } from "@material-ui/core";

import APP_ID from "./key";
import axios from "axios";

import DisplayCard from "./DisplayCard";

const BASE_URL = 'https://dummyapi.io/data/api';
const awal = "animal"

const options = ['animal', 'dog', 'cat', 'pet', 'mammal', 'puppy', 'human', 'beach',
  'nature', 'plant', 'mountain', 'ocean', 'outdoors', 'field', 'sunset']

export default class Search extends Component {
  render() {
    return (
      <div>
        <Container id="" maxWidth="md">
          <Grid container spacing={3}>
            <Grid style={{ textAlign: "center" }} item xs={12}>
              <Link href={`/search/tag/${awal}`}>
                <Button size="small" variant="contained" color="secondary">
                  Search By Tags
                  </Button>
              </Link>
              <Link style={{ marginLeft: 5 }} href="/userlist">
                <Button size="small" variant="contained" color="primary">
                  Search By Name
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}