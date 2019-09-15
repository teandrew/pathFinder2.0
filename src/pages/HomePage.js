import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  },
  campus: {
    "&:hover": {
      backgroundColor: "#102e4b",
      color: "white",
      transform: "scale(1.05)",
      transition: "all 0.4s ease 0s"
    },
    borderRadius: "10px",
    marginBottom: "20px",
    padding: 20
  }
});

export default function HomePage() {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const campusList = [
    {
      shortName: "utm",
      name: "University of Toronto Mississauga"
    },
    {
      shortName: "utsc",
      name: "University of Toronto Scarborough"
    },
    {
      shortName: "utsg",
      name: "University of Toronto St. George"
    }
  ];
  return (
    <Container className="pageContainer">
      <main role="main" className={classes.root}>
        <Typography variant="h3" gutterBottom>
          University of Toronto Course Reviews
        </Typography>
        <Typography variant="body1" gutterBottom>
          Hear from past students about their experiences.
        </Typography>
        <Typography variant="h4" gutterBottom>
          Select your campus:
        </Typography>
        <Container maxWidth="sm">
          <ul>
            {campusList.map(campus => (
              <Link key={campus.shortName} to={"/explore/" + campus.shortName}>
                <Card className={classes.campus}>
                  <li>
                    <Typography variant="h6">{campus.name}</Typography>
                  </li>
                </Card>
              </Link>
            ))}
          </ul>
        </Container>
      </main>
    </Container>
  );
}
