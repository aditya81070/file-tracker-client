import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const login = {
      email,
      password
    }

    axios.post(`${url}/users/login`, login).then((res) => {
      const token = res.data.token;
      window.localStorage.setItem('token', token);
      console.log(token)
    })
  }

  render() {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form  noValidate onSubmit={this.handleSubmit}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              
            >
              Sign In
            </Button>
          </form>
        </div>
        
      </Container>
    );
  }
}

export default SignIn;