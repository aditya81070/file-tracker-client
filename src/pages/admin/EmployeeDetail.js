import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, makeStyles } from "@material-ui/core";
const url = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.dark}`
  }
}));
const EmployeeDetail = ({ empId }) => {
  const [data, setData] = useState({});
  const classes = useStyles();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .get(`${url}/employees/${empId}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
        console.log("employee fetched");
        setData(res.data);
      })
      .catch(err => console.error("can not fetch employee", err));
  }, [empId]);

  const { email, name, designation } = data;
  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h1">
        Employee Details
      </Typography>
      <Typography variant="subtitle2" component="h1">
        Name: <em>{name}</em>
      </Typography>
      <Typography variant="subtitle2" component="h1">
        Email: <em>{email}</em>
      </Typography>
    </div>
  );
};

export default EmployeeDetail;
