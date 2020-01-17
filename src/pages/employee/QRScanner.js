import React, { Component } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import EmpWrapper from '../../components/wrapper/EmpWrapper';

const url = process.env.REACT_APP_BASE_URL;

export default class QrScanner extends Component {
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
    return (
      <EmpWrapper>
        <div>
          {this.state.show && (
            <QrReader
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "50%" }}
            />
          )}
        </div>
      </EmpWrapper>
    );
  }
}
