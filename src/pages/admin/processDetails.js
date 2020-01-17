import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  buttonContainer: {
    marginLeft: "auto",
    "& > button": {
      marginRight: theme.spacing(2)
    }
  },
  expDetails: {
    background: "#f8f8f8",
    flexDirection: "column",
    width: "100%"
  },
  stepDetail: {
    backgroundColor: "#fff",
    boxShadow: `10px 10px 5px #f8f8f8`,
    border: `1px solid #f2f2f2`,
    width: "100%",
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2)
  }
}));

const StepDetail = ({ step, sno }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      direction="column"
      className={classes.stepDetail}
    >
      <Grid item>
        <Typography variant="h6" component="h1">
          Step {sno} - {step.title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" component="p" paragraph>
          {step.desc}
        </Typography>
        <Typography variant="subtitle2" component="p" paragraph>
          Division: {step.division}
        </Typography>
        <Typography variant="subtitle2" component="p" paragraph>
          Duration: {step.duration} days
        </Typography>
      </Grid>
    </Grid>
  );
};
export default function ProcessDetails(props) {
  const { name, title, description, steps, _id: pid } = props.data;
  const { expanded, onDelete } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleEditClick = e => {
    e.stopPropagation();
    history.push(`/admin/process/update/${pid}`);
  };

  const handleDelete = e => {
    e.stopPropagation();
    onDelete();
  };
  return (
    <ExpansionPanel expanded={name === expanded} onChange={props.onChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" component="p">
          {title}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expDetails}>
        <Typography variant="h6" component="p">
          {description}
        </Typography>
        {steps.map((step, index) => (
          <StepDetail step={step} sno={index + 1} key={index} />
        ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
