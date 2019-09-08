import React from "react";
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
      departments: ["One", "Two"],
      selectedDept: "",
      courses: [
        {
          rating: 0,
          courseCode: "CSC108H5",
          courseName: "Introduction to Programming"
        },
        {
          rating: 0,
          courseCode: "CSC148H5",
          courseName: "Introduction to Computer Science"
        }
      ]
    };
  }

  componentDidMount() {}

  getList = () => {
    let departmentsOption = [];

    for (let i = 0; i < this.state.departments.length; i++) {
      departmentsOption.push(
        <option key={this.state.departments[i]}>
          {this.state.departments[i]}
        </option>
      );
    }

    return departmentsOption;
  };

  handleChange = e => {
    this.setState({ selectedDept: e.target.value });
  };

  handleClick = e => {
    console.log(e);
  };

  render() {
    return (
      <div>
        <h1>Explore</h1>

        <FormControl>
          <InputLabel htmlFor="age-native-simple">Select Department</InputLabel>
          <Select
            native
            value={this.state.selectedDept}
            onChange={this.handleChange}
          >
            {this.getList()}
          </Select>
        </FormControl>

        <Results
          courses={this.state.courses}
          onClick={this.handleClick}
        ></Results>
      </div>
    );
  }
}

export default ExplorePage;
