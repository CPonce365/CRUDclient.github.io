/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

// Define styling for the header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },

  links:{
    textDecoration: 'none',
  },

  button: {
    marginTop: '10px',  // Ensures button has some space between the image
  }
}));


const HomePageView = () => {
 const classes = useStyles();

  return (
    <div >
      <h1>Home Page</h1>
      <div className={classes.root}>
      <img src={`/Campus.jpg?cacheBuster=${new Date().getTime()}`} alt="Campus" style={{width: '400px', height: '250px',}} />
          <Link className={classes.links} to={'/campuses'} >
          <br/>
            <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
              Campuses
            </Button>
          </Link>
          <br/>
          <img src={`/StudentPFP.jpg?cacheBuster=${new Date().getTime()}`} alt="PFP" style={{width: '300px', height: '250px', paddingTop: '2%' }} />
          <Link className={classes.links} to={'/students'} >
          <br/>
            <Button variant="contained" color="primary">
              Students
            </Button>
          </Link>
     
    </div>
    </div>
  );    
}

export default HomePageView;