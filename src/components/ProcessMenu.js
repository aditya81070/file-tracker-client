import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    select: {
        marginBottom: '10px'
    }
});

class ProcessMenu extends React.Component {
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
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        )
    }
}

export default withStyles(styles)(ProcessMenu);