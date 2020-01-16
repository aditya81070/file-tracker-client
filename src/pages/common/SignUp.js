import React from 'react';
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
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Login from './Login';
import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
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
    textTransform: 'none'
  }
});

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      designation: '',
      division: '',
      tel: '',
      email: '',
      password: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, designation, division, tel, email, password } = this.state;

    const user = {
      name,
      designation,
      division,
      tel,
      email,
      password
    };
    axios.post(`${url}/users/signup`, user).then(res => {
      console.log(res.data);
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container>
            <Grid item sm>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form
                noValidate
                onSubmit={this.handleSubmit}
                className={classes.form}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={this.handleInputChange}
                />
                <InputLabel htmlFor="designation">Designation</InputLabel>
                <Select
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  native
                  id="designation"
                  name="designation"
                  onChange={this.handleInputChange}
                >
                  <option value="" />
                  <option value={1}>A</option>
                  <option value={2}>B</option>
                  <option value={3}>C</option>
                </Select>

                <InputLabel htmlFor="division">Division</InputLabel>
                <Select
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  native
                  id="division"
                  name="division"
                  onChange={this.handleInputChange}
                >
                  <option value="" />
                  <option value={1}>A</option>
                  <option value={2}>B</option>
                  <option value={3}>C</option>
                </Select>

                <TextField
                  variant="outlined"
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
            <Grid item>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Login />
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Signup);
