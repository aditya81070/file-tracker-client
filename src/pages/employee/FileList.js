import React from 'react';
import MaterialTable from 'material-table';
import { Container, Link, withStyles } from '@material-ui/core';
import { tableIcons } from '../../components/TableIcons';
import axios from 'axios';
import EmpWrapper from '../../components/wrapper/EmpWrapper';

const url = process.env.REACT_APP_BASE_URL;

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginTop: theme.spacing(1.5)
    },
    textAlign: 'center'
  },
  title: {
    padding: `${theme.spacing(1.25)}px 0px`
  },
  button: {
    textTransform: 'none',
    width: '20%',
    margin: '10px auto'
  }
});

class FileList extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      response: []
    }
  }
  componentDidMount() {
    const token = window.localStorage.getItem('token');

    axios.get(`${url}/file/employee`, {
      headers: { Authorization: `bearer ${token}` }
    }).then(res => {
      this.setState({
        response: res.data
      })
    })
  }
  render() {
    const { classes } = this.props;
    const preventDefault = event => event.preventDefault();
    return (
      <EmpWrapper>
      <Container component="main" maxWidth="md">
        <MaterialTable
          icons={tableIcons}
          title="File List"
          columns={[
            {
              title: 'File Name',
              field: 'fName',
              render: rowData => (
                <Link href="#" onClick={preventDefault}>
                  Link
                </Link>
              )
            },
            {
              title: 'Process Name',
              field: 'pName',
              render: rowData => (
                <Link href="#" onClick={preventDefault}>
                  Link
                </Link>
              )
            },
            {
              title: 'Status',
              field: 'status',
              lookup: { 34: 'Done', a: 'Pending' }
            }
          ]}
        />
      </Container>
      </EmpWrapper>
    );
  }
}

export default withStyles(styles)(FileList);
