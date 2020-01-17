import React from "react";
import MaterialTable from "material-table";
import { Container, withStyles, Button } from "@material-ui/core";
import { tableIcons } from "../../components/TableIcons";
import QRGWrapper from "../../components/wrapper/QRGWrapper";
import axios from "axios";
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
    textTransform: "none"
  }
});

class ViewFiles extends React.Component {
  state = {
    files: [],
    processes: []
  };
  handleClick = e => {
    console.log(e.target.value);
    this.setState({
      open: true
    });
  };

  handleClose = e => {
    this.setState({
      open: false
    });
  };

  handleEdit = e => {};
  componentDidMount() {
    const token = window.localStorage.getItem("token");
    axios.get(`${url}/qrg/process`).then(res => {
      console.log(res.data);
      this.setState({
        processes: res.data
      });
    });
    axios
      .get(`${url}/files`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          files: res.data
        });
      })
      .catch(err => console.log("can not get files", err));
  }
  render() {
    const { classes } = this.props;
    const { files, processes } = this.state;

    const data = files.map(file => {
      const { name, processName, processTitle, steps, qr, _id: id } = file;
      return {
        name,
        processName,
        processTitle,
        division: steps[0].division,
        qr,
        id
      };
    });
    const processData = processes.reduce((acc, cur) => {
      acc[cur.name] = cur.title;
      return acc;
    }, {});
    return (
      <QRGWrapper>
        <Container component="main" maxWidth="md">
          <MaterialTable
            icons={tableIcons}
            title="File List"
            columns={[
              { title: "File Name", field: "name", editable: "onUpdate" },
              {
                title: "Process Name",
                field: "processName",
                editable: "onUpdate",
                lookup: processData
              },
              { title: "Division", field: "division", editable: "never" },
              {
                title: "Download QR Code",
                field: "qr",
                editable: "never",
                render: rowData => (
                  <Button
                    component="a"
                    href={rowData.qr}
                    download
                    variant="text"
                    target="_blank"
                    download
                    className={classes.button}
                  >
                    Download
                  </Button>
                )
              }
            ]}
            data={data}
            editable={{
              onRowUpdate: (newData, oldData) => {
                const token = window.localStorage.getItem("token");
                return new Promise((resolve, reject) => {
                  axios
                    .put(
                      `${url}/files/${newData.id}`,
                      {
                        name: newData.name,
                        processName: newData.processName
                      },
                      {
                        headers: {
                          Authorization: `bearer ${token}`
                        }
                      }
                    )
                    .then(res => {
                      console.log("file updated");
                      window.location.reload();
                      resolve();
                    })
                    .catch(err => {
                      console.log("can not update file");
                      reject();
                    });
                });
              },
              onRowDelete: oldData => {
                const token = window.localStorage.getItem("token");
                return new Promise((resolve, reject) => {
                  axios
                    .delete(`${url}/files/${oldData.id}`, {
                      headers: {
                        Authorization: `bearer ${token}`
                      }
                    })
                    .then(res => {
                      console.log("deleted file");
                      this.setState(prev => ({
                        files: prev.files.filter(
                          file => file._id !== oldData.id
                        )
                      }));
                      resolve();
                    })
                    .catch(err => {
                      console.log(" can not delete file", err);
                      reject();
                    });
                });
              }
            }}
          />
        </Container>
      </QRGWrapper>
    );
  }
}

export default withStyles(styles)(ViewFiles);
