import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import axios from 'axios';

import Step from "./Step";

const url = process.env.REACT_APP_BASE_URL;

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: theme.spacing(1.5)
    }
  },
  title: {
    padding: `${theme.spacing(1.25)}px 0px`
  },
  button: {
    textTransform: "none"
  }
});

class AddProcess extends React.Component {
  state = {
    pUniqueName: "",
    title: "",
    description: "",
    steps: [
      {
        title: "",
        duration: "",
        division: "",
        task: ""
      }
    ]
  };

  addStep = () => {
    this.setState(prevState => ({
      steps: [
        ...prevState.steps,
        {
          title: "",
          duration: "",
          division: "",
          task: ""
        }
      ]
    }));
  };

  removeStep = idx => () => {
    this.setState(prevState => ({
      steps: prevState.steps.filter((_, index) => index !== idx)
    }));
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handelStepInputChange = index => e => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState(prevState => ({
      steps: prevState.steps.map((step, idx) =>
        idx === index ? { ...step, [name]: value } : step
      )
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    const { pUniqueName, title, description, steps } = this.state;

    const process = {
      pUniqueName,
      title,
      description,
      steps
    };
    console.log(process);
    axios.post(`${url}`, token, process).then((res) => {
      console.log(res);
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5" className={classes.title}>
            Create Process
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="pUniqueName"
              label="Unique Name"
              name="pUniqueName"
              value={this.state.pUniqueName}
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="title"
              label="Title"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              multiline
              rowsMax="5"
              required
              fullWidth
              size="small"
              name="description"
              label="Description"
              id="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
            {this.state.steps.map((step, idx) => (
              <Step
                step={step}
                index={idx}
                key={idx}
                handleInputChange={this.handelStepInputChange(idx)}
                removeStep={this.removeStep(idx)}
              />
            ))}
            <Grid container spacing={4} direction="row" justify="center">
              <Grid item md={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={this.addStep}
                  className={classes.button}
                >
                  Add Step
                </Button>
              </Grid>
              <Grid item md={3}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Create Process
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(AddProcess);
