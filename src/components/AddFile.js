import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default ({ handleInputChange, handleSubmit, post}) => {
    return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h5">
              Create File
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="fileName"
                label="File Name"
                name="fileName"
                value={post.fileName}
                onChange={handleInputChange}
              />
              
                <Select
                variant="outlined"
                required
                fullWidth
                size="small"
                id='pUniqueName'
                name='pUniqueName'
                value={post.pUniqueName}
                onChange={handleInputChange}
                displayEmpty
                >
                <MenuItem value="" dense>
                    Select a process unique name
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create File
                  </Button>    
            </form>
          </div>
        </Container>
      );
}
    

