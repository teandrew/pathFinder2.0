import React from "react";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  }
}));

export default function AddReviewForm({
  formValues,
  handleSubmit,
  updateValue,
  updateSliderValue
}) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const styles = { maxWidth: 345 };
  const displayBlock = { display: "block" };

  const marks = [
    {
      value: 1,
      label: "1"
    },
    {
      value: 2,
      label: "2"
    },
    {
      value: 3,
      label: "3"
    },
    {
      value: 4,
      label: "4"
    },
    {
      value: 5,
      label: "5"
    }
  ];

  return (
    <Card style={styles}>
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="professor"
            value={formValues.professor}
            label="Professor"
            placeholder="e.g. Larry Zhang"
            fullWidth
            onChange={updateValue}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            required
            id="term"
            value={formValues.term}
            onChange={updateValue}
            style={displayBlock}
            label="Term"
            placeholder="e.g. Fall/Winter/Summer"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          {/* <FormControl variant="outlined" style={displayBlock}>
            <InputLabel htmlFor="outlined-term-native-simple">Term*</InputLabel>
            <Select
              native
              value={props.values.term}
              onChange={props.updateValue}
            >
              <option value="" />
              <option>Fall</option>
              <option>Winter</option>
              <option>Summer</option>
            </Select>
          </FormControl> */}
          <TextField
            required
            value={formValues.year}
            onChange={updateValue}
            style={displayBlock}
            id="year"
            label="Year"
            type="number"
            placeholder="e.g. 2017"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Typography component="label">Interesting</Typography>
          <Slider
            id="interesting"
            defaultValue={3}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChangeCommitted={(e, val) => updateSliderValue(val)}
            step={1}
            marks={marks}
            min={1}
            max={5}
          />

          <Typography component="label">Difficulty</Typography>
          <Slider
            id="difficulty"
            defaultValue={3}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChangeCommitted={(e, val) => updateSliderValue(e, val)}
            step={1}
            marks={marks}
            min={1}
            max={5}
          />
          <TextField
            id="comment"
            value={formValues.comment}
            onChange={updateValue}
            label="Comment"
            placeholder="e.g. Advice"
            helperText="Let other know what they should know about the course!"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rowsMax="10"
            InputLabelProps={{
              shrink: true
            }}
          />

          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
