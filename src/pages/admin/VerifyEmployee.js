import React from "react";
import MaterialTable from "material-table";
import { Button, Container, withStyles } from "@material-ui/core";
import axios from "axios";
import { tableIcons } from "../../components/TableIcons";
import AdminWrapper from "../../components/wrapper/AdminWrapper";

const url = process.env.REACT_APP_BASE_URL;

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: theme.spacing(1.5)
    },
    textAlign: "center"
  },
  title: {
    padding: `${theme.spacing(1.25)}px 0px`
  },
  button: {
    textTransform: "none",
    width: "20%",
    margin: "10px auto"
  }
});

class VerifyEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      verifyUsers: []
    };
  }

  handleChecked = e => {
    let userId;
    if (e.target.checked) {
      userId = e.target.value;
    } else {
      const index = this.state.verifyUsers.indexOf(e.target.value);
      if (index > -1) {
        this.state.verifyUsers.splice(index, 1);
      }
    }

    if (typeof userId === "undefined") {
    } else {
      this.setState(prevState => ({
        verifyUsers: [...prevState.verifyUsers, userId]
      }));
    }
  };

  handleVerifyEmployee = e => {
    e.preventDefault();
    const userIds = this.state.verifyUsers;
    const token = window.localStorage.getItem("token");
    console.log(token);
    if (userIds.length === 1) {
      axios
        .post(`${url}/employee/verify/${userIds[0]}`, " ", {
          headers: { Authorization: `bearer ${token}` }
        })
        .then(res => {
          console.log(res.data);
          window.location.reload();
        });
    } else {
      axios
        .post(`${url}/employee/verify`, userIds, {
          headers: { Authorization: `bearer ${token}` }
        })
        .then(res => {
          console.log(res.data);
          window.location.reload();
        });
    }
  };

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    axios
      .get(`${url}/employee/verify`, {
        headers: { Authorization: `bearer ${token}` }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          response: res.data
        });
      });
  }
  render() {
    const { classes } = this.props;
    const data = this.state.response.map(res => ({
      id: res._id,
      name: res.name,
      designation: res.designation,
      division: res.division,
      contact: res.contact,
      email: res.email,
      verify: res.isVerified,
      role: res.role
    }));
    return (
      <AdminWrapper>
        <Container component="main" maxWidth="md">
          <MaterialTable
            icons={tableIcons}
            title="Employee List"
            columns={[
              { title: "Name", field: "name" },
              {
                title: "Designation",
                field: "designation"
              },
              {
                title: "Division",
                field: "division"
              },
              { title: "Contact", field: "contact" },
              { title: "Email", field: "email" },
              {
                title: "Verify",
                field: "checkbox",
                render: rowData => (
                  <input
                    type="checkbox"
                    onChange={this.handleChecked}
                    value={rowData.id}
                  />
                )
              }
            ]}
            data={data}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleVerifyEmployee}
          >
            Verify
          </Button>
        </Container>
      </AdminWrapper>
    );
  }
}

export default withStyles(styles)(VerifyEmployee);
