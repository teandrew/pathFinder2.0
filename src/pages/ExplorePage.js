import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import { db } from "../firebase";
import Results from "../components/Results";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300
  },
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

class ExplorePage extends React.Component {
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

  getCourses = dept => {
    db.collection("courses")
      .where("department", "==", dept)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length) {
          let courses = querySnapshot.docs.map(c => c.data());
          console.log(courses);
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
          {!this.state.isLoading && (
            <Fragment>
              <h1>Explore</h1>

              <FormControl>
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
        </Fragment>
      );
    }
  }
}

export default ExplorePage;
