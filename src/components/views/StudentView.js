/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
const StudentView = (props) => {
  const { student, campus } = props;
  
  return (
    <div>
      <img src={`/StudentPFP.jpg?cacheBuster=${new Date().getTime()}`} alt="PFP" style={{width: '300px', height: '250px', paddingTop: '2%' }} />
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.email}</h3>
      <h3>Campus: {campus && campus.id ? campus.name : "No Campus"}</h3> 

      {campus && campus.id && (
        <Link to={`/campus/${campus.id}`}>
          <button>Go to Campus</button>
        </Link>
      )}
     
    </div>
  );

};

export default StudentView;