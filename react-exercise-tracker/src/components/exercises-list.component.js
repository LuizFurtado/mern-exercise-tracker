import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Functional component (stateless component): has no state, its function is act as a
 * "container" to display information passed by a stateful component. 
 */
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={'/edit/'+props.exercise._id}>edit</Link> | <a href='#' onClick={() => props.deleteExercise(props.exercise._id)}>delete</a>
        </td>
    </tr>
)

/**
 * Class component (statefull component): presents a state, acts as a orchestrator to
 * manage data coming from an API or any other external source. It receives data and pass
 * it down to functional components to display it dinamically.
 */
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(response => {
                this.setState({ exercises: response.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));
        
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={ currentExercise } deleteExercise={ this.deleteExercise } key={ currentExercise._id } />; 
        })
    }

    render() {
        return(
            <div>
                <h2>Logged Exercises</h2>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}