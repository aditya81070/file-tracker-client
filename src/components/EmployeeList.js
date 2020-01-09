import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class EmployeeList extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      verifyUsers: []
    }
  }

  handleChecked = (e) => {
    let userId = '';
    if(e.target.checked && e.target.value) {
      userId = e.target.value
    }
    console.log(userId);
    this.setState((prevState) => ({ 
      verifyUsers: [...prevState.verifyUsers, userId]
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userIds = this.state.verifyUsers;
    console.log(userIds.length);
    if(userIds.length == 1) {
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
    {headers: {'Authorization': "bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE2Yzc4ZjJlMGMxMjUwOWI1OTdhYzciLCJpYXQiOjE1Nzg1OTcxMjIsImV4cCI6MTU3ODYwMDcyMn0.vUJtbtCcEfmNxz-VJi3y8cKJV-IG1ZFiSri7dRtmGW0"}})
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
         verify: res.isVerified
      })
    })
    return (
      <form onSubmit={this.handleSubmit}>
      <MaterialTable
        title="Editable Example"
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
            >
              Verify
            </Button>
      </form>

    );
  }
}

