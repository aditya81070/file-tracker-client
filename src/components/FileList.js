import React from 'react';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
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

class FileList extends React.Component{
  render() {
    const { classes } = this.props;
    const preventDefault = event => event.preventDefault();
    return (
      <Container component="main" maxWidth="md">
      <MaterialTable
        icons={tableIcons}
        title="File List"
        columns={[
          { title: 'File Name', field: 'fName', render: rowData => 
            <Link href="#" onClick={preventDefault}>
              Link
            </Link>
          },
          { title: 'Process Name', field: 'pName', render: rowData => 
            <Link href="#" onClick={preventDefault}>
              Link
            </Link>
          },
          { title: 'Status', field: 'status' ,
          lookup: { 34: 'Done', a: 'Pending' }
        }
        ]}
        
      />
      </Container>
    );
  }
}

export default withStyles(styles)(FileList);