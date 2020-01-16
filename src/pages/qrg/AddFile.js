import React from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container
} from '@material-ui/core';
import ProcessMenu from './ProcessMenu';

export default ({ handleInputChange, handleSubmit, post }) => {
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

          <Button fullWidth type="submit" variant="contained" color="primary">
            Create File
          </Button>
        </form>
      </div>
    </Container>
  );
};
