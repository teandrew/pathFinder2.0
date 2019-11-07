import React from "react";

import AddReviewForm from "./AddReviewForm";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";

import { db } from "../firebase";

export default class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewInfo: {
        course_id: this.props.courseId,
        professor: "",
        comment: "",
        term: "",
        year: "",
        interesting: 3,
        difficulty: 3
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.addReview(this.state.reviewInfo);
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
