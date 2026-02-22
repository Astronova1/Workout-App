import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const handleClick = async () => {
        if (!user){
            return
        }

        let result = window.confirm('Do you want to delete this workout?')
        if(!result){
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {      ///api/workouts/
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }


    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <div className="workout-icons">
                <Link to={`/${workout._id}`}><span className="material-symbols-outlined" >edit</span></Link>
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            </div>            
        </div>
    )
}

export default WorkoutDetails