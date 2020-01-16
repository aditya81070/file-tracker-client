import React from 'react';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core";
import { tableIcons } from './TableIcons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ProcessMenu from './ProcessMenu';

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
    width: '100%',
    margin: '10px auto',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    padding: '8px 10px',
    cursor: 'pointer'
  }
});

class ViewFilesQrg extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }
    handleClick = (e) => {
        console.log(e.target.value)
        this.setState({
            open: true
        })
    }

    handleClose = (e) => {
        this.setState({
            open: false
        })
    }

    handleEdit = (e) => {

    }

  render() {
    const { classes } = this.props; 

    return (
      <Container component="main" maxWidth="md">
      <MaterialTable
        icons={tableIcons}
        title="File List"
        columns={[
          { title: 'File Name', field: 'fName'},
          { title: 'Process Name', field: 'pName'},
          { title: 'Edit', field: 'edit', render: rowData => 
          <button onClick={this.handleClick} value="file1" className={classes.button}>UPDATE</button> 
        },
          { title: 'Delete', field: 'delete', render: rowData => 
          <button onClick={this.handleClick} value="file1" className={classes.button}>DELETE</button> 
        }
        ]}
        data={[
            {fName:'File1', pName: 'Ten'}
        ]}
        
      />
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fName"
            label="File Name"
            type="fName"
            onChange={this.handleInputChange}
            fullWidth
          />
          
          <ProcessMenu />
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
    );
  }
}

export default withStyles(styles)(ViewFilesQrg);