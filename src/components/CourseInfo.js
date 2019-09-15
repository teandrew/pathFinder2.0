import React from "react";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function CourseInfo({ course }) {
  return (
    <React.Fragment>
      <Container maxWidth="lg" style={{ padding: "0 32px 32px 32px" }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {course.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {course.code}
            </Typography>

            <Typography variant="h6" component="label">
              Description
            </Typography>
            <Typography variant="body2" gutterBottom>
              {course.description}
            </Typography>

            <Typography variant="h6" component="label">
              Prerequisite
            </Typography>
            <Typography variant="body2" gutterBottom>
              {course.prerequisite}
            </Typography>
            <Typography variant="h6" component="label">
              Exclusion
            </Typography>
            <Typography variant="body2" gutterBottom>
              {course.exclusion}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}
