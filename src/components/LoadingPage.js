import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%"
  }
});

export default function LoadingPage() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CircularProgress className={classes.root} />
    </React.Fragment>
  );
}
