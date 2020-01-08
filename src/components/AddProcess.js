import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

class AddProcess extends React.Component {
    state={
        pUniqueName: '',
        title: '',
        description: '',
        steps: [{
            sequence_no: 0,
            title: "",
            duration: "",
            division: "",
            task: ""
        }]
    }

    addStep = () => {
        this.setState((prevState) => ({
            steps: [...prevState.steps, {
                sequence_no: 0,
                title: "",
                duration: "",
                division: "",
                task: ""
            }]
        }))
    }

    handleInputChange = (e) => {
      console.log(e.target.value);
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { pUniqueName, title, description, steps } = this.state;

      const process = {
        pUniqueName,
        title,
        description,
        steps
      }
      console.log(process)
    }
    render() {
        return (
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <div>
                
                <Typography component="h1" variant="h5">
                  Create Process
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="pUniqueName"
                        label="Unique Name"
                        name="pUniqueName"
                        autoFocus
                        onChange={this.handleInputChange}
                    />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    onChange={this.handleInputChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    multiline
                    rowsMax="5"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description" 
                    onChange={this.handleInputChange}
                  />
                  
                  {
                      this.state.steps.map((value, index) => {
                          let sequence_no = `${index+1}`, titleId = `title${index+1}`, durationId = `duration${index+1}`, divisionId = `division${index+1}`, taskId = `task${index+1}`;
                          return (
                              <div key={index}>
                              <Typography component="h1" variant="h6">
                                Step {index+1}
                             </Typography>
                            <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="title"
                    label="Title"
                    id={titleId} 
                    onChange={this.handleInputChange}
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name={durationId}
                    label="Duration(in days)"
                    type="number"
                    id={durationId}
                    onChange={this.handleInputChange}
                  />
                  <InputLabel htmlFor={divisionId}>Division</InputLabel>
                  <Select
                  margin="normal"
                  required
                  fullWidth
                        native
                        value={this.state.steps.division}
                        id={divisionId}
                        name={divisionId}
                        onChange={this.handleInputChange}
                   >
                        <option value="" />
                        <option value={1}>A</option>
                        <option value={2}>B</option>
                        <option value={3}>C</option>
                  </Select>
                  
                  <TextField
                    variant="standard"
                    margin="normal"
                    multiline
                    rowsMax="5"
                    required
                    fullWidth
                    name={taskId}
                    label="Task"
                    id={taskId} 
                    onChange={this.handleInputChange}
                  />
                              </div>
                          )
                      })
                  }
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.addStep}
                  >
                    Add Step
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
 
                  >
                    Create
                  </Button>
                </form>
              </div>
              
            </Container>
          );
    }
}

  
export default AddProcess;