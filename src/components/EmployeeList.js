import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { tableIcons } from './TableIcons';

const url = process.env.REACT_APP_BASE_URL;

class EmployeeList extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      empId: ''
    }
  }
  handleInputChange = e => {
    let empId = e.target.value;
    this.setState({
      empId: empId
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const empId = this.state.empId;
    const token = window.localStorage.getItem('token');
    axios.get(`${url}/employees/${empId}`, 
    {headers: {'Authorization': `bearer ${token}`}})
    .then((res) => {
      const data = [res.data];
      console.log(data);
      this.setState({
        response: data
      })
    })
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    axios.get(`${url}/employees`, 
    {headers: {'Authorization': `bearer ${token}`}})
    .then((res) => {
      console.log(res.data)
      this.setState({
        response: res.data
      })
    })
  }
  render() {
    const data = [];
    this.state.response.map((res) => {
      data.push({id: res._id,
        name: res.name,
         designation: res.designation,
         division: res.division,
         contact:res.contact,
         email: res.email,
         role: res.role
      })
    })
    return (
      <Container component="main" maxWidth="md">
      <div>
                    <Typography component="h1" variant="h5">
                        Search Employee
                    </Typography>
                    <form  noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="empId"
                        label="Enter Employee Id"
                        type="empId"
                        name="empId"
                        autoFocus
                        onChange={this.handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        >
                        Search
                    </Button>
                    </form>
      </div>
      <div>
      <MaterialTable
      icons={tableIcons}
        title="Employee List"
        columns={[
          { title: 'EmpID', field: 'id' },
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
          { title: 'Role', field: 'role' },
        ]}
        data={data}
      />
      </div>
      </Container>
    );
  }
}

export default EmployeeList;