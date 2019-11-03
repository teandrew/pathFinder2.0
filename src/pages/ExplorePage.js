import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

import LoadingPage from "../components/LoadingPage";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { db } from "../firebase";
import Results from "../components/Results";

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      selectedDept: "",
      isLoading: true,
      redirect: false,
      courses: []
    };
  }

  componentDidMount() {
    let { campus } = this.props.match.params;

    db.collection("institutions")
      .where("_id", "==", campus)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length) {
          let { _id } = querySnapshot.docs[0].data();

          this.getDepartments(_id);
        } else {
          this.setState({ redirect: true });
        }
      });
  }

  getDepartments = campus => {
    db.collection("departments")
      .where("institution", "==", campus)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length) {
          let departments = querySnapshot.docs.map(d => d.data());
          this.setState({ departments: departments, isLoading: false });
        }
      });
  };

  renderOptions = () => {
    let departmentsOption = [<option key="first"></option>];

    for (let i = 0; i < this.state.departments.length; i++) {
      departmentsOption.push(
        <option key={this.state.departments[i].title}>
          {this.state.departments[i].title}
        </option>
      );
    }

    return departmentsOption;
  };

  handleChange = e => {
    this.setState({ selectedDept: e.target.value });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/404" />;
    } else {
      return (
        <Fragment>
          <Container className="pageContainer" maxWidth="lg">
            {this.state.isLoading && <LoadingPage />}
            {!this.state.isLoading && (
              <Fragment>
                <Typography variant="h3" gutterBottom>
                  Explore Courses
                </Typography>

                <FormControl style={{ marginBottom: 20 }}>
                  <InputLabel htmlFor="age-native-simple">
                    Select Department
                  </InputLabel>
                  <Select
                    native
                    value={this.state.selectedDept}
                    onChange={this.handleChange}
                  >
                    {this.renderOptions()}
                  </Select>
                </FormControl>

                <Results
                  courses={this.state.courses}
                  selectedDept={this.state.selectedDept}
                ></Results>
              </Fragment>
            )}
          </Container>
        </Fragment>
      );
    }
  }
}
