import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import CardHeader from "@material-ui/core/CardHeader";

const review = {
  date: "2/10/2018",
  comment:
    "I really enjoyed this course because of how Larry taught the course",
  professor: "Larry Zhang",
  interesting: 6,
  difficulty: 3
};

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    marginBottom: 25,
    marginRight: 25,
    display: "inline-block"
  }
});

export default function Review() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader subheader={review.date}></CardHeader>
      <CardContent>
        <Typography gutterBottom color="textSecondary" component="p">
          {review.comment}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography component="label">Interesting</Typography>
            <p>{review.interesting}</p>
          </Grid>
          <Grid item xs={6}>
            <Typography component="label">Difficulty</Typography>
            <p>{review.difficulty}</p>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
