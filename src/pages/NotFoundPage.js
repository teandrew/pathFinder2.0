import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center"
  },
  button: {
    marginTop: "20px"
  },
  link: {
    color: "white"
  }
});

export default function NotFoundPage() {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="sm">
      <Typography variant="h4">
        Error 404 Ooops, we can't find what you were looking for
        <Button variant="contained" color="primary" className={classes.button}>
          <Link className={classes.link} to="/">
            Select your campus
          </Link>
        </Button>
      </Typography>
    </Container>
  );
}
