import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Components import: all components used by the react router
 * These components reflects the routes available at the backend
 * Each route is created on a separated component.
 * For code organization and to use custom styled components, you can also
 * create folders for each component.
 */
import Navbar from './components/navbar.component';
import ExercisesList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Route path='/' exact component={ ExercisesList } />
        <Route path='/edit/:id' component={ EditExercise } />
        <Route path='/create' component={ CreateExercise } />
        <Route path='/user' component={ CreateUser } />
      </div>
    </Router>
  );
}

export default App;
