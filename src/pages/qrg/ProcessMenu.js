import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
const url = process.env.REACT_APP_BASE_URL;

const styles = theme => ({
  select: {
    marginBottom: "10px"
  }
});

class ProcessMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      processes: []
    };
  }

  componentDidMount() {
    axios.get(`${url}/qrg/process`).then(res => {
      console.log(res.data);
      this.setState({
        processes: res.data
      });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <InputLabel htmlFor="processName">Process Name</InputLabel>
        <Select
          variant="outlined"
          required
          fullWidth
          size="small"
          id="processName"
          name="processName"
          value={this.props.value}
          onChange={this.props.handleChange}
          displayEmpty
          className={classes.select}
          margin="none"
        >
          {this.state.processes.map(process => {
            return (
              <MenuItem
                value={process.name}
                key={process.name}
                name="processName"
              >
                {process.title}
              </MenuItem>
            );
          })}
        </Select>
      </>
    );
  }
}

export default withStyles(styles)(ProcessMenu);
