import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

export default class QrScanner extends Component {
  state = {
    result: 'No result'
  };

  handleScan = data => {
    if (data) {
      console.log(data);
      this.setState({
        result: data
      });
    }
  };
  handleError = err => {
    console.error(err);
  };
  render() {
    return (
      <div>
        <QrReader
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '50%' }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}
