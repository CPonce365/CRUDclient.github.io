/*import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { editStudentThunk } from "../../store/thunks";
import { getStudentThunk } from "../../store/thunks";
import { EditStudentView } from "../views";
import { red } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { editStudent } from '../../store/actions/actionCreators';

class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state ={
            firstname: "", 
            lastname: "", 
            email: "",
            imageUrl: "",
            gpa: "",
            campusId: null, 
            redirect: false, 
            redirectId: null
        }
    }

    componentDidMount() {
        const studentId = this.props.match.params.id;
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {student} = this.state;
        
        let updatedStudent = await this.props.editStudent(student);

        this.setState({
            redirect: true,
            redirectId: student.id
        })
    }


    render() {
        if(this.state.redirect){
            return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }

        return(
            <div>
                <Header />
                <EditStudentView 
                handleChange = {this.handleChange}
                handleSubmit = {this.handleSubmit}
                />
                </div>

        )
    }
}

const mapDispatch = (dispatch) => {
    return({
        getStudent: (studentId) => dispatch(getStudentThunk(studentId)),
        editStudent: (student) => dispatch(editStudentThunk(student))
    })
}

export default connect(null, mapDispatch)(EditStudentContainer); */