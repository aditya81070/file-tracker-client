import React, { Component } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import EmpWrapper from "../../components/wrapper/EmpWrapper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const url = process.env.REACT_APP_BASE_URL;

const styles = theme => ({
  qrScanner: {
    width: "90vw",
    height: "50vh",
    maxWidth: "600px",
    maxHeight: "600px",
    border: `1px solid ${theme.palette.primary.main}`
  },
  qrContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& > *": {
      margin: theme.spacing(2, 0)
    }
  }
});

class QrScanner extends Component {
  state = {
    show: true
  };

  handleScan = data => {
    if (data) {
      this.setState(prev => ({
        show: false
      }));
      console.log("Data", data);
      const parsedData = JSON.parse(data);
      console.log(typeof parsedData);
      const { fileId } = parsedData;
      console.log(fileId);
      const token = window.localStorage.getItem("token");
      console.log(fileId);
      axios
        .post(
          `${url}/file/employee/${fileId}`,
          {
            fileId
          },
          { headers: { Authorization: `bearer ${token}` } }
        )
        .then(res => {
          console.log("filename send");
          console.log(res);
          this.props.history.push("/emp");
        })
        .catch(err => {
          console.log("can not scan qr");
        });
    }
  };
  handleError = err => {
    console.error(err);
  };
  render() {
    const { classes } = this.props;
    return (
      <EmpWrapper>
        {this.state.show && (
          <div className={classes.qrContainer}>
            <Typography variant="h4" component="h1">
              Scan QR Code
            </Typography>
            <QrReader
              onError={this.handleError}
              onScan={this.handleScan}
              facingMode="environment"
              className={classes.qrScanner}
            />
          </div>
        )}
      </EmpWrapper>
    );
  }
}

export default withStyles(styles)(QrScanner);
