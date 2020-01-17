import React from 'react';
// import MaterialTable, { MTableToolbar } from 'material-table';
import {
  Container,
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Chip
} from '@material-ui/core';
import axios from 'axios';
import { tableIcons } from '../../components/TableIcons';
import AdminWrapper from '../../components/wrapper/AdminWrapper';

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
    width: '100%',
    margin: '10px auto',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    padding: '8px 10px',
    cursor: 'pointer'
  }
});

class ProcessList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      open: false,
      id: '',
      process: ''
    };
  }
  handleClick = e => {
    const id = e.target.value;
    this.setState({
      open: true
    });
    const token = window.localStorage.getItem('token');
    axios
      .get(`${url}/processes/${id}`, {
        headers: { Authorization: `bearer ${token}` }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          process: res.data
        });
      });
  };

  handleClose = e => {
    this.setState({
      open: false
    });
  };

  handleEdit = e => {};

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    axios
      .get(`${url}/processes`, {
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
    const { classes } = this.props;
    const process = this.state.process;

    const data = this.state.response.map(res => ({
        id: res._id,
        title: res.title,
        description: res.description,
        name: res.name,
        steps: res.steps
      }));
    return (
      <AdminWrapper>
        <Container component="main" maxWidth="md">
          <MaterialTable
            icons={tableIcons}
            title="Process List"
            columns={[
              { title: 'Title',
               field: 'title',
               render: rowData => (
                 <input
                   type="button"
                   onClick={this.handleClick}
                   value={rowData.id}
                   className={classes.button}
                 />
               )
             },
              {
                title: 'Name',
                field: 'name'
              },
              {
                title: 'Status',
                field: 'status'
              }
            ]}
            data={data}
            components={{
              Toolbar:  props => {
                console.log(props)
                  return <div>
                      <MTableToolbar {...props} />
                      <div style={{padding: '0px 10px'}}>
                        <Chip label="Chip 1" color="secondary" style={{marginRight: 5}}/>
                        <Chip label="Chip 2" color="secondary" style={{marginRight: 5}}/>
                        <Chip label="Chip 3" color="secondary" style={{marginRight: 5}}/>
                        <Chip label="Chip 4" color="secondary" style={{marginRight: 5}}/>
                        <Chip label="Chip 5" color="secondary" style={{marginRight: 5}}/>
                      </div>
                    </div>
              },
            }}
          />
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{process.title}</DialogTitle>
            <DialogContent>
              {process.description}
              
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
              <Button onClick={this.handleEdit} color="primary">
                Edit
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </AdminWrapper>
    );
  }
}

export default withStyles(styles)(ProcessList);
