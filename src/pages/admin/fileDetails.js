import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
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
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
