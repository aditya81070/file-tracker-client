import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import AdminWrapper from '../../components/wrapper/AdminWrapper';
import { tableIcons } from '../../components/TableIcons';

const url = process.env.REACT_APP_BASE_URL;

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: []
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    axios
      .get(`${url}/employees`, {
        headers: { Authorization: `bearer ${token}` }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          response: res.data
        });
      });
  }
  render() {
    const data = this.state.response.map(res => ({
      name: res.name,
      designation: res.designation,
      division: res.division,
      contact: res.contact,
      email: res.email,
      role: res.role
    }));
    return (
      <AdminWrapper>
        <Container component="main" maxWidth="md">
          <div>
            <MaterialTable
              icons={tableIcons}
              title="Employee List"
              columns={[
                { title: 'Name', field: 'name' },
                {
                  title: 'Designation',
                  field: 'designation',
                  lookup: { 34: 'İstanbul', a: 'Şanlıurfa' }
                },
                {
                  title: 'Division',
                  field: 'division',
                  lookup: { sample: 'İstanbul', 63: 'Şanlıurfa' }
                },
                { title: 'Contact', field: 'contact', type: 'numeric' },
                { title: 'Email', field: 'email' },
                { title: 'Role', field: 'role' }
              ]}
              data={data}
            />
          </div>
        </Container>
      </AdminWrapper>
    );
  }
}

export default EmployeeList;
