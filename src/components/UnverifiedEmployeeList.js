import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core";
import { tableIcons } from './TableIcons';


const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: theme.spacing(1.5)
    },
    textAlign: "center"
  },
  title: {
    padding: `${theme.spacing(1.25)}px 0px`
  },
  button: {
    textTransform: "none",
    width: '20%',
    margin: '10px auto'
  }
});

class UnverifiedEmployeeList extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      verifyUsers: []
    }
  }

  handleChecked = (e) => {
    let userId;
    if(e.target.checked) {
      userId = e.target.value
    } else {
      const index = this.state.verifyUsers.indexOf(e.target.value);
      if(index>-1) {
        this.state.verifyUsers.splice(index, 1);
      }  
    }

    if(typeof userId === 'undefined') {} 
    else {
      this.setState((prevState) => ({ 
        verifyUsers: [...prevState.verifyUsers, userId]
      }))
    }  
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userIds = this.state.verifyUsers;
    
    if(userIds.length === 1) {
      axios.post(`https://13.233.200.7:3443/employee/verify/${userIds[0]}`)
      .then((res) => {
        console.log(res.data);
      })
    } else {
      axios.post(`https://13.233.200.7:3443/employee/verify`, userIds)
      .then((res) => {
        console.log(res.data);
      })
    }
  }

  componentDidMount() {
    axios.get(`https://13.233.200.7:3443/employee/verify`, 
    {headers: {'Authorization': "bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE2Yzc4ZjJlMGMxMjUwOWI1OTdhYzciLCJpYXQiOjE1Nzg3Mzc5OTYsImV4cCI6MTU3ODc0MTU5Nn0.hbMEnQfzfO77se8XnrQWTrBie-fC-yYB_VBleUq0Uiw"}})
    .then((res) => {
      console.log(res.data)
      this.setState({
        response: res.data
      })
    })
  }
  render() {
    const { classes } = this.props;
    const data = [];
    this.state.response.map((res) => {
      data.push({id: res._id,
        name: res.name,
         designation: res.designation,
         division: res.division,
         contact:res.contact,
         email: res.email,
         verify: res.isVerified
      })
    })
    return (
      <Container component="main" maxWidth="md">
      <form onSubmit={this.handleSubmit} className={classes.form}>
      <MaterialTable
      icons={tableIcons}
        title="Employee List"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Designation', field: 'designation' ,
          lookup: { 34: 'İstanbul', a: 'Şanlıurfa' }
        },
        {
          title: 'Division',
          field: 'division',
          lookup: { sample: 'İstanbul', 63: 'Şanlıurfa' },
        },
          { title: 'Contact', field: 'contact', type: 'numeric' },
          { title: 'Email', field: 'email'},
          { title: 'Verify', field: 'checkbox', render: rowData => <input type="checkbox" onChange={this.handleChecked} value={rowData.id}/>},
        ]}
        data={data}
      />
      <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary" 
              className={classes.button}
            >
              Verify
            </Button>
      </form>
      </Container>
    );
  }
}

export default withStyles(styles)(UnverifiedEmployeeList);