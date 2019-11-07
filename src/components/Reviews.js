import React, { Fragment } from "react";

import { db } from "../firebase";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import AddReview from "./AddReview";
import Review from "./Review";

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      isLoading: false,
      userHasReviewed: false
    };
  }

  componentDidMount() {
    let cookieId = localStorage.getItem("c_id");
    let stateUpdates = {};
    db.collection("reviews")
      .where("course_id", "==", this.props.course.code)
      .get()
      .then(querySnapshot => {
        const reviews = querySnapshot.docs.length
          ? querySnapshot.docs.map(r => r.data())
          : [];

        stateUpdates["reviews"] = reviews;
        if (cookieId) {
          const userHasReviewed =
            reviews.find(review => {
              return review.reviewedBy == cookieId;
            }) !== undefined;

          stateUpdates["userHasReviewed"] = userHasReviewed;
        }

        stateUpdates["isLoading"] = false;

        this.setState(stateUpdates);
      });
  }

  getReviews = () => {
    db.collection("reviews")
      .where("course_id", "==", this.props.course.code)
      .get()
      .then(querySnapshot => {
        const reviews = querySnapshot.docs.length
          ? querySnapshot.docs.map(r => r.data())
          : [];

        this.setState({ reviews: reviews });
      });
  };

  addReview = reviewInfo => {
    let cookieId = localStorage.getItem("c_id");

    if (!cookieId) {
      cookieId = this.createCookieId();
      localStorage.setItem("c_id", cookieId);
    }

    let reviewInfo_copy = {
      ...reviewInfo,
      reviewedBy: cookieId
    };

    db.collection("reviews")
      .add({ ...reviewInfo_copy })
      .then(() => {
        this.setState({ userHasReviewed: true });
        this.getReviews();
      });
  };

  createCookieId = () => {
    let cookieId = "";
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 41; i++)
      cookieId += possible.charAt(Math.floor(Math.random() * possible.length));

    return cookieId;
  };

  render() {
    return (
      <Fragment>
        <Container maxWidth="lg" style={{ paddingTop: 20 }}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {!this.state.isLoading && (
            <React.Fragment>
              {(!this.state.reviews.length && (
                <Card style={{ marginRight: 8, marginBottom: 40 }}>
                  <CardContent>
                    <Typography component="p">
                      No one has left a review yet
                    </Typography>
                  </CardContent>
                </Card>
              )) ||
                (this.state.reviews.length &&
                  this.state.reviews.map(review => (
                    <Review key={review.reviewedBy} review={review} />
                  )))}
              {!this.state.userHasReviewed && (
                <AddReview
                  courseId={this.props.course.code}
                  addReview={this.addReview}
                />
              )}
            </React.Fragment>
          )}
        </Container>
      </Fragment>
    );
  }
}
