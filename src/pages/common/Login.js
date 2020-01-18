import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  withStyles
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_BASE_URL;

const styles = theme => ({
  container: {
    height: "100vh",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center"
  }
});

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      redirectPath: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const login = {
      email,
      password
    };
    console.log(login);

    axios.post(`${url}/users/login`, login).then(res => {
      console.log(res);
      const token = res.data.token;
      const role = res.data.role;
      window.localStorage.setItem("token", token);
      if (role === "admin") {
        this.setState({ redirect: true, redirectPath: "/admin" });
      } else if (role === "emp") {
        this.setState({ redirect: true, redirectPath: "/emp" });
      } else if (role === "qrg") {
        this.setState({ redirect: true, redirectPath: "/qrg" });
      }
    });
  };

  render() {
    const { classes } = this.props;
    if (!this.state.redirect) {
      return (
        <Container component="main" maxWidth="sm" className={classes.container}>
          <CssBaseline />
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleInputChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Log In
            </Button>
          </form>
          <Typography variant="h6" component="p">
            Not a user? <Link to="/signup">Signup here</Link>
          </Typography>
        </Container>
      );
    } else {
      return <Redirect push to={this.state.redirectPath} />;
    }
  }
}

export default withStyles(styles)(LogIn);
