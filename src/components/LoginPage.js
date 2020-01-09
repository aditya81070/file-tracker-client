import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';

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

    const config = {
      headers: {'Authorization': "bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE2Yzc4ZjJlMGMxMjUwOWI1OTdhYzciLCJpYXQiOjE1Nzg1Njk3OTMsImV4cCI6MTU3ODU3MzM5M30.S82KYl251otfXcRB7naTBCSaGIh1oDPIVbvGwy7PvyA"}
    }

    axios.post(`https://13.233.200.7:3443/users/login`, login, config).then((res) => {
      console.log(res.data)
    })
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form  noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              
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