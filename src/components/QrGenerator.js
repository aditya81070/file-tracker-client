import React from 'react';
import QRCode from 'qrcode.react';
import AddFile from './AddFile';

import { withStyles } from "@material-ui/core";

const styles = theme => ({
    qr: {
        textAlign: 'center'
    },
    a: {
        cursor: 'pointer'
    }
});

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
            fileName: "",
            pUniqueName: "",
            isSubmitted: 0
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitted: 1
        })
        const { fileName, pUniqueName } = this.state;
        console.log("FileName" + fileName);
    }

    render() {
        const { classes } = this.props;
        return (  
            <div>
            <AddFile
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            post={this.state}
            />

            { this.state.isSubmitted === 1? (
                <div className={classes.qr}>
                    <QRCode 
                    id="files"
                    value={this.state.fileName}
                    size={290}
                    level={"H"}
                    includeMargin={true} /><br />
                    <a onClick={downloadQR} className={classes.a}>Click here to Download</a>
                </div>
            )
            : 
            (
                <div>
                    
                </div>
            )
            }
            </div>
        )
    }
}

export default withStyles(styles)(QrGenerator);