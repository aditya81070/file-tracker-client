import React from 'react';
import QRCode from 'qrcode.react';
import AddFile from './AddFile';

const downloadQR = () => {
    let canvas = document.getElementById("files").value;
    canvas = canvas.replace(/\s+/g, '');
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
        return (  
            <div>
            <AddFile
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            post={this.state}
            />

            { this.state.isSubmitted === 1? (
                <div>
                    <QRCode 
                    id="files"
                    value={this.state.fileName}
                    size={290}
                    level={"H"}
                    includeMargin={true} />
                    <a onClick={downloadQR}>Click here to Download</a>
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

export default QrGenerator;