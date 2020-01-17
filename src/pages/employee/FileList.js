import React from "react";
import MaterialTable from "material-table";
import { Container, Link, withStyles, Typography } from "@material-ui/core";
import { tableIcons } from "../../components/TableIcons";
import axios from "axios";
import EmpWrapper from "../../components/wrapper/EmpWrapper";

const url = process.env.REACT_APP_BASE_URL;

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
    width: "20%",
    margin: "10px auto"
  },
  fileDetail: {
    padding: theme.spacing(3),
    backgroundColor: "#f8f8f8"
  }
});

class FileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: []
    };
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token");

    axios
      .get(`${url}/file/employee`, {
        headers: { Authorization: `bearer ${token}` }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          response: res.data
        });
      })
      .catch(err => console.log(`can not display files`, err));
  }
  render() {
    const { classes } = this.props;
    const preventDefault = event => event.preventDefault();
    const data = this.state.response.map(file => {
      const {
        name,
        processTitle,
        step: { title, desc, deadline }
      } = file;
      return {
        name,
        processTitle,
        title,
        desc,
        deadline
      };
    });
    return (
      <EmpWrapper>
        <Container component="main" maxWidth="md">
          <MaterialTable
            icons={tableIcons}
            title="File List"
            columns={[
              {
                title: "File Name",
                field: "name"
              },
              {
                title: "Process Name",
                field: "processTitle"
              },
              {
                title: "Deadline",
                field: "deadline"
              },
              {
                title: "Completed",
                field: "checkbox",
                render: rowData => (
                  <input
                    type="checkbox"
                    onChange={this.handleChecked}
                    value={rowData.id}
                  />
                )
              }
            ]}
            data={data}
            detailPanel={rowData => (
              <div className={classes.fileDetail}>
                <Typography variant="h5" component="h1">
                  {rowData.title}
                </Typography>
                <Typography variant="body2" component="p" paragraph>
                  {rowData.desc}
                </Typography>
              </div>
            )}
          />
        </Container>
      </EmpWrapper>
    );
  }
}

export default withStyles(styles)(FileList);
