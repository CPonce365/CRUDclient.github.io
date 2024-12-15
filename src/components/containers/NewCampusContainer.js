import Header from './Header';
import { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            address: "",
            description: "",
            image: "", 
            redirect: false,
            redirectId: null,
            errors: {},
        };
    }

    
handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
}

validInputs = () => {
    let errors = {};
    let Valid = true;

    // Basic validation logic
    if (!this.state.name) {
      Valid = false;
      errors.name = "Campus name is required!";
    }

    if (!this.state.address) {
      Valid = false;
      errors.address = "Address is required!";
    }

    if (!this.state.description) {
      Valid = false;
      errors.description = "Description is required!";
    }

    this.setState({ errors });
    return Valid;
  };

handleSubmit = async event => {
    event.preventDefault();

    if (!this.validInputs()) {
        return;
      }

    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        image: this.state.image,
    };

    let newCampus = await this.props.addCampus(campus);

    this.setState({
        name: "",
        address: "",
        description: "",
        image: "",
        redirect: true,
        redirectId: newCampus.id,
    });
}

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to={`/campus/${this.state.redirectId}`} />);
        }

        return(
            <div>
                <Header />
                <NewCampusView
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    errors={this.state.errors}
                />
            </div>
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);