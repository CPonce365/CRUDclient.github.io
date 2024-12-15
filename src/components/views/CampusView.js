/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";


// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, deleteStudent} = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <img src={`/Campus.jpg?cacheBuster=${new Date().getTime()}`} alt="Campus" style={{width: '400px', height: '250px', paddingTop: '5%' }} />
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      {campus.students.length > 0 ? (
        campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
            <img src={`/StudentPFP.jpg?cacheBuster=${new Date().getTime()}`} alt="PFP" style={{width: '300px', height: '250px', paddingTop: '2%' }} />
              <h2>{name}</h2>
            </Link>    
            <button onClick={() => deleteStudent(student.id)}>Delete Student</button>      
            <br></br>   
          </div>
        );
      })
    ) : (
    <p>No studetnts are enrolled! Please Click the "Enroll Student" button! </p>
    )}
    <br/>
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      <br/><br/>
      <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      
    </div>
  );
};

export default CampusView;