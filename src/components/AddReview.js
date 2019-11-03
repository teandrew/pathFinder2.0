import React from "react";

import AddReviewForm from "./AddReviewForm";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";

export default class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewInfo: {
        professor: "",
        comment: "",
        term: "",
        year: "",
        interesting: 3,
        difficulty: 3
      }
    };
  }

  addReview = () => {
    let cookieId = localStorage.getItem(c_id);

    if (!cookieId) {
      localStorage.setItem(this.createCookieId());
    }
  };

  createCookieId = () => {
    let cookieId = "";
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 41; i++)
      cookieId += possible.charAt(Math.floor(Math.random() * possible.length));

    return cookieId;
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  updateValue = event => {
    this.setState({
      reviewInfo: {
        ...this.state.reviewInfo,
        [event.target.id]: event.target.value
      }
    });
  };

  updateSliderValue = value => {
    let interestingValue = document.getElementById("interesting");
    let difficultyValue = document.getElementById("difficulty");

    this.setState({
      reviewInfo: {
        ...this.state.reviewInfo,
        interesting: interestingValue,
        difficulty: difficultyValue
      }
    });

    console.log(this.state.reviewInfo);
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Leave Your Own Review
        </Typography>
        <AddReviewForm
          formValues={this.state.reviewInfo}
          handleSubmit={this.handleSubmit}
          updateValue={this.updateValue}
          updateSliderValue={this.updateSliderValue}
        />
      </React.Fragment>
    );
  }
}
