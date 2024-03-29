import React from "react";
import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

import { db } from "../firebase";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courses: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDept !== this.props.selectedDept) {
      this.getCourses(this.props.selectedDept);
    }
  }

  getCourses = dept => {
    this.setState({ isLoading: true });
    db.collection("courses")
      .where("department", "==", dept)
      .get()
      .then(querySnapshot => {
        let courses = querySnapshot.docs.map(c => c.data());
        this.setState({
          courses: courses,
          isLoading: false
        });
      });
  };

  render() {
    return (
      <section>
        <Typography variant="h6" gutterBottom>
          Results
        </Typography>
        <Paper>
          {this.state.isLoading && <LinearProgress />}

          <Table component="div">
            <TableHead component="div">
              <TableRow component="div">
                <TableCell component="p">Rating</TableCell>
                <TableCell component="p">Course Code</TableCell>
                <TableCell component="p">Name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody component="div">
              {this.state.courses.map(course => (
                <TableRow
                  hover
                  key={course.code}
                  component={Link}
                  to={"/courses/" + course.code}
                >
                  <TableCell component="p" scope="row">
                    {course.ratings.average}
                  </TableCell>
                  <TableCell component="p">{course.code}</TableCell>
                  <TableCell component="p">{course.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {!this.state.courses.length && (
          <Container maxWidth="sm" style={{ padding: 40, textAlign: "center" }}>
            <Typography variant="h6" color="textSecondary">
              Choose a department above
            </Typography>
          </Container>
        )}
      </section>
    );
  }
}
