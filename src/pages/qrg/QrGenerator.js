import React from "react";
import QRCode from "qrcode.react";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddFile from "./AddFile";
import QRGWrapper from "../../components/wrapper/QRGWrapper";
import axios from "axios";

const styles = theme => ({
  qr: {
    textAlign: "center"
  },
  a: {
    cursor: "pointer"
  }
});

const url = process.env.REACT_APP_BASE_URL;

const downloadQR = () => {
  let canvas = document.getElementById("files");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "files.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

class QrGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      processName: "",
      isSubmitted: false,
      qrPath: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, processName } = this.state;
    const token = window.localStorage.getItem("token");
    const fileData = {
      name,
      processName
    };
    axios
      .post(`${url}/files`, fileData, {
        headers: { Authorization: `bearer ${token}` }
      })
      .then(res => {
        console.log("qr code generated");
        const { qr } = res.data;
        this.setState({
          qrPath: qr,
          isSubmitted: true
        });
      })
      .catch(err => console.log("can not generate qr", err));
  };

  render() {
    const { classes } = this.props;
    return (
      <QRGWrapper>
        <div>
          <AddFile
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            post={this.state}
          />

          {this.state.isSubmitted ? (
            <div className={classes.qr}>
              <a href={this.state.qrPath} download>
                <img src={this.state.qrPath} alt="qr code" />
              </a>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  href={this.state.qrPath}
                  target="_blank"
                  rel="noopener"
                >
                  Download QR Code
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </QRGWrapper>
    );
  }
}

export default withStyles(styles)(QrGenerator);
