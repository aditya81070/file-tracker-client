import React from "react";
import {
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  withStyles
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

const styles = theme => ({
  title: {
    padding: theme.spacing(1)
  },
  button: {
    textTransform: "none"
  }
});

function Step({ step, handleInputChange, index, removeStep, classes }) {
  let titleId = `title${index + 1}`,
    durationId = `duration${index + 1}`,
    divisionId = `division${index + 1}`,
    taskId = `task${index + 1}`;
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography component="h2" variant="h6" className={classes.title}>
            Step {index + 1}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Delete fontSize="small" />}
            size="small"
            onClick={removeStep}
          >
            <Typography
              variant="button"
              component="span"
              className={classes.button}
            >
              Delete Step
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        required
        fullWidth
        size="small"
        name="title"
        label="Title"
        id={titleId}
        value={step.title}
        onChange={handleInputChange}
      />
      <TextField
        variant="outlined"
        required
        fullWidth
        size="small"
        name="duration"
        label="Duration(in days)"
        type="number"
        id={durationId}
        value={step.duration}
        onChange={handleInputChange}
      />
      <InputLabel htmlFor={divisionId}>Division</InputLabel>
      <Select
        variant="outlined"
        required
        fullWidth
        size="small"
        id={divisionId}
        name="division"
        value={step.division}
        onChange={handleInputChange}
        displayEmpty
      >
        <MenuItem value="" dense>
          Select a item
        </MenuItem>
        <MenuItem value="counter1">Counter1</MenuItem>
        <MenuItem value="counter2">Counter2</MenuItem>
        <MenuItem value="counter3">Counter3</MenuItem>
      </Select>

      <TextField
        variant="outlined"
        multiline
        rowsMax="5"
        required
        fullWidth
        size="small"
        name="desc"
        label="Description"
        id={taskId}
        value={step.desc}
        onChange={handleInputChange}
      />
    </>
  );
}

export default withStyles(styles)(Step);
