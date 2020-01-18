import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EmployeeDetail from "./EmployeeDetail";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  timingContainer: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "48px",
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.primary.light,
    opacity: 0.8
  }
}));

export default function FileDetails({ steps }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Stepper orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step._id} active={step.status}>
            <StepLabel className={classes.stepLabel}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h6" component="p">
                    {step.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" component="p">
                    {step.division}
                  </Typography>
                </Grid>
              </Grid>
            </StepLabel>
            <StepContent>
              <Typography>{step.desc}</Typography>
              {step.empID && <EmployeeDetail empId={step.empID} />}
              <div className={classes.timingContainer}>
                {step.scannedOn && (
                  <Typography variant="subtitle2" component="h1">
                    Scanned On:{" "}
                    <em>{new Date(step.scannedOn).toDateString()}</em>
                  </Typography>
                )}
                {step.completedOn && (
                  <Typography variant="subtitle2" component="h1">
                    Completed On:{" "}
                    <em>{new Date(step.completedOn).toDateString()}</em>
                  </Typography>
                )}
                {step.deadline && (
                  <Typography variant="subtitle2" component="h1">
                    Deadline: <em>{new Date(step.deadline).toDateString()}</em>
                  </Typography>
                )}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
