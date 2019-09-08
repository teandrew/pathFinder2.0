import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = course => {};

  render() {
    return (
      <section>
        <h2>Results</h2>

        <Paper>
          <Table component="div">
            <TableHead component="div">
              <TableRow component="div">
                <TableCell component="p">Rating</TableCell>
                <TableCell component="p">Course Code</TableCell>
                <TableCell component="p">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody component="div">
              {this.props.courses.map(course => (
                <TableRow
                  hover
                  key={course.courseCode}
                  component={Link}
                  to={"/courses/" + course.courseCode}
                >
                  <TableCell component="p" scope="row">
                    {course.rating}
                  </TableCell>
                  <TableCell component="p">{course.courseCode}</TableCell>
                  <TableCell component="p">{course.courseName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </section>
    );
  }
}
