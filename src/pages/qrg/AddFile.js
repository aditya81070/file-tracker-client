import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  makeStyles
} from "@material-ui/core";
import ProcessMenu from "./ProcessMenu";

const useStyles = makeStyles(theme => ({
  form: {
    "& > div": {
      margin: theme.spacing(2, 0)
    }
  }
}));
export default ({ handleInputChange, handleSubmit, post }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Generate QR Code
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="File Name"
            name="name"
            value={post.name}
            onChange={handleInputChange}
          />

          <ProcessMenu
            value={post.processName}
            handleChange={handleInputChange}
          />

          <Button
            fullWidth
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Create File
          </Button>
        </form>
      </div>
    </Container>
  );
};
