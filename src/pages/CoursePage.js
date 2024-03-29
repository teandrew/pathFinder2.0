import React from "react";
import { Redirect } from "react-router-dom";

import Container from "@material-ui/core/Container";

import Reviews from "../components/Reviews";
import CourseInfo from "../components/CourseInfo";
import LoadingPage from "../components/LoadingPage";

import { db } from "../firebase";

export default class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      redirect: false,
      course: {}
    };
  }

  componentDidMount() {
    let { courseCode } = this.props.match.params;

    if (!courseCode) {
      this.setState({ redirect: true });
    } else {
      const docRef = db.collection("courses").doc(courseCode);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.setState({
              course: doc.data(),
              isLoading: false
            });
          } else {
            this.setState({ redirect: true });
          }
        })
        .catch(error => {
          console.log(error);
          console.log("Error getting course");
        });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/404" />;
    } else {
      return (
        <Container className="pageContainer">
          {this.state.isLoading && <LoadingPage />}
          {!this.state.isLoading && (
            <main role="main">
              <CourseInfo course={this.state.course} />

              <Reviews course={this.state.course} />
            </main>
          )}
        </Container>
      );
    }
  }
}
