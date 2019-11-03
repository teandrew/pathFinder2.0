import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";

const review = {
  date: "2/10/2018",
  comment:
    "I really enjoyed this course because of how Larry taught the course",
  professor: "Larry Zhang",
  interesting: 6,
  difficulty: 3,
  year: "2019",
  term: "Fall"
};

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    marginBottom: 25,
    marginRight: 25,
    display: "inline-block"
  },
  header: {
    "& span": {
      float: "right",
      fontWeight: 700,
      color: "white"
    },
    backgroundColor: "lightblue"
  },
  label: {
    fontWeight: 700,
    marginRight: "5px"
  },
  rating: {
    textAlign: "center"
  }
});

const formatDate = date => {
  let newDate = new Date(date).toString();
  let dateParts = newDate.split(" ");

  return `${dateParts[1]}` + " " + `${dateParts[2]}` + " " + `${dateParts[3]}`;
};

export default function Review() {
  const classes = useStyles();
  return (
    <Card style={{ marginRight: 8 }} className={classes.card}>
      <CardHeader
        className={classes.header}
        subheader={formatDate(review.date)}
      ></CardHeader>
      <CardContent>
        <Typography className={classes.label} component="label">
          Professor:
        </Typography>
        <Typography component="p">{review.professor}</Typography>
        <Typography className={classes.label} component="label">
          Term:
        </Typography>
        <Typography component="p">{review.term}</Typography>
        <Typography className={classes.label} component="label">
          Year:
        </Typography>
        <Typography component="p">{review.year}</Typography>
        <Typography className={classes.label} component="label">
          Comment:
        </Typography>
        <Typography gutterBottom color="textSecondary" component="p">
          "{review.comment}"
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography className={classes.label} component="label">
              Interesting
            </Typography>
            <Typography component="p">{review.interesting}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.label} component="label">
              Difficulty
            </Typography>
            <Typography component="p">{review.difficulty}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
