import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";

import CoursePage from "./pages/CoursePage";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import NotFoundPage from "./pages/NotFoundPage";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "white"
  },
  header: {
    backgroundColor: "#102e4b"
  }
}));

export default function App() {
  const classes = useStyles();
  return (
    <Router>
      <AppBar className={classes.header} position="static">
        <ToolBar>
          <nav>
            <Link to="/">
              <Typography variant="h6" className={classes.title}>
                PathFinder
              </Typography>
            </Link>
          </nav>
        </ToolBar>
      </AppBar>
      <Route exact path="/" component={HomePage} />
      <Route path="/explore/:campus" component={ExplorePage} />
      <Route path="/courses/:courseCode" component={CoursePage} />
      <Route path="/404" component={NotFoundPage} />
    </Router>
  );
}
