import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import SignIn from './LoginPage';
class LoginSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      designation: '',
      division: '',
      tel: '',
      email: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, designation, division, tel, email } = this.state;

    const user = {
      name,
      designation,
      division,
      tel,
      email
    }

    console.log(user);
  }
  render() {
    return (
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <div >
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          
            <Grid container>
              <Grid item>
              <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="standard"
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
              <SignIn/>
              </Grid>
            </Grid>
          
        </div>
      </Container>
    );
  }
}
  
export default LoginSignup;