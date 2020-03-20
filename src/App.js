import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist.js'
import Traininglist from './components/Traininglist.js'
import  { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';



function App() {
  return (
    <div className="App">
      
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" style={{marginLeft:100}}>
            Personal training app
          </Typography>
          
        </Toolbar>
      </AppBar>
    
      <BrowserRouter> 
      <div> 
        <Link to="/calendar" style={{margin:15}}>Calendar</Link>{' '} 
        <Link to="/customers" style={{margin:15}}>Customers</Link>{' '} 
        <Link to="/trainings" style={{margin:15}}>Trainings</Link>{' '} 
          <Switch> 
            <Route exact path='/'  render={() => <h1>Caledar coming soon..</h1>} /> 
            <Route path="/customers" component={Customerlist} /> 
            <Route path="/trainings" component={Traininglist} />
            <Route render={() => <h1>Page not found</h1>} /> 
          </Switch> 
        </div> 
      </BrowserRouter> 


    </div>
  );
}

export default App;
