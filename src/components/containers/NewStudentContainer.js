
/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      //gpa: null,
      campusId: null, 
      redirect: false, 
      redirectId: null,
      errors: {},
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validateInputs = () => {
    let errors = {};
    let Valid = true;

    if (!this.state.firstname) {
      Valid = false;
      errors.firstname = "First name is required!";
    }

    if (!this.state.lastname) {
      Valid = false;
      errors.lastname = "Last name is required!";
    }

    if (!this.state.email || !/\S+@\S+\.\S+/.test(this.state.email)) {
      Valid = false;
      errors.email = "Valid email is required! Example:example@email.com";
    }

    if (!this.state.gpa || isNaN(this.state.gpa) || this.state.gpa < 0 || this.state.gpa > 4) {
      Valid = false;
      errors.gpa = "GPA must be a number between 0 and 4!";
    }

    if (!this.state.campusId || isNaN(this.state.campusId)) {
      Valid = false;
      errors.campusId = "Campus ID must be a valid number from a Campus!";
    }

    this.setState({ errors });
    return Valid;
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    
    if (!this.validateInputs()) {
      return;
    }
    
    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        description: this.state.description,
        campusId: this.state.campusId,
       // gpa: this.state.gpa,
    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      description: "",
      //gpa: null,
      campusId: null, 
      redirect: true, 
      redirectId: newStudent.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}   
          errors={this.state.errors} 
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);
