import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  InputLabel,
  Select,
  withStyles
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: theme.spacing(1.5)
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  title: {
    padding: `${theme.spacing(1.25)}px 0px`
  },
  button: {
    textTransform: "none"
  }
});

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      designation: "",
      division: "",
      tel: "",
      email: "",
      password: "",
      role: "emp"
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      name,
      designation,
      division,
      tel,
      email,
      password,
      role
    } = this.state;

    const user = {
      name,
      designation,
      division,
      tel,
      email,
      password,
      role
    };
    axios.post(`${url}/users/signup`, user).then(res => {
      this.props.history.push("/login");
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                justify="space-between"
                direction="row"
                alignItems="center"
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign Up
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="h6" component="p">
                    Already a user? <Link to="/login">Log in here</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <form
                noValidate
                onSubmit={this.handleSubmit}
                className={classes.form}
              >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={this.handleInputChange}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="designation"
                  label="Designation"
                  name="designation"
                  onChange={this.handleInputChange}
                />

                <InputLabel htmlFor="role">Your Role</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  native
                  id="role"
                  name="role"
                  onChange={this.handleInputChange}
                  displayEmpty
                >
                  <option value="emp">Employee</option>
                  <option value="qrg">QR Generator</option>
                </Select>

                <InputLabel htmlFor="division">Division</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  native
                  id="division"
                  name="division"
                  onChange={this.handleInputChange}
                >
                  <option value="">select division</option>
                  <option value="Division1">Division1</option>
                  <option value="Division2">Division2</option>
                  <option value="Division3">Division3</option>
                </Select>

                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="tel"
                  label="Contact"
                  name="tel"
                  type="tel"
                  onChange={this.handleInputChange}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={this.handleInputChange}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={this.handleInputChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Signup);
