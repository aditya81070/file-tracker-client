import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Grid,
  withStyles
} from "@material-ui/core";
import axios from "axios";

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

class UpdateProcess extends React.Component {
  state = {
    name: "",
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

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    const pid = this.props.match.params.pid;
    axios
      .get(`${url}/processes/${pid}`, {
        headers: { Authorization: `bearer ${token}` }
      })
      .then(res => {
        console.log(res.data);
        const { name, title, description, steps } = res.data;
        this.setState({
          name,
          title,
          description,
          steps
        });
      })
      .catch(err => console.log("cannot get process list", err));
  }

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
    const token = window.localStorage.getItem("token");
    const { name, title, description, steps } = this.state;
    const { pid } = this.props.match.params;

    const process = {
      name,
      title,
      description,
      steps
    };
    axios
      .put(`${url}/processes/${pid}`, process, {
        headers: { Authorization: `bearer ${token}` }
      })
      .then(res => {
        this.props.history.push("/admin");
      })
      .catch(err => {
        console.error("could not update process", err);
        // alert('can not create process, try later')
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5" className={classes.title}>
            Update Process
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="pUniqueName"
              label="Unique Name"
              name="name"
              value={this.state.name}
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
                  Update Process
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(UpdateProcess);
