import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { Container, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '50%',
    display: "flex"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function SearchByName(props) {
  const classes = useStyles();
  return (
    <Container id="" maxWidth="md">
      <Grid container spacing={3}>
        <Grid container direction="row" justify="center" alignItems="center" item xs={12}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Grid item xs={6}>
              <SearchIcon />
              </Grid>
            </div>
            <Grid item xs={6}>
              <InputBase
                placeholder="Search. . . (Firstname)"
                textAlign="center"
                onChange={props.onChange}
              />
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
