import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ProcessMenu from './ProcessMenu';

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
                margin="normal"
                required
                fullWidth
                size="small"
                id="fileName"
                label="File Name"
                name="fileName"
                value={post.fileName}
                onChange={handleInputChange}
              />
              
                <ProcessMenu
                  value={post.pUniqueName}
                  handleChange={handleInputChange}
                
                />
              
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
    

