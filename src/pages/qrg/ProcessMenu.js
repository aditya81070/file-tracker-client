import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core";
import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;

const styles = theme => ({
    select: {
        marginBottom: '10px'
    }
});

class ProcessMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processes: []
        }
    }

    componentDidMount() {
        axios
          .get(`${url}/qrg/process`)
          .then(res => {
            console.log(res.data);
            this.setState({
                processes: res.data
            })
          });
      }
    render() {
        const { classes } = this.props;
        return (
            <Select
                variant="outlined"
                required
                fullWidth
                size="small"
                id='pUniqueName'
                name='pUniqueName'
                value={this.props.value}
                onChange={this.props.handleChange}
                displayEmpty
                className={classes.select}
                >
                <MenuItem value="" dense>
                    Select a process unique name
                </MenuItem>
                {this.state.processes.map((process) => {
                    return <MenuItem value={process.name}>{process.title}</MenuItem>
                })}
                
            </Select>
        )
    }
}

export default withStyles(styles)(ProcessMenu);