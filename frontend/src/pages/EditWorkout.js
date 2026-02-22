import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'


const EditWorkout = () => {
    const { id } = useParams()
    const { workouts } = useWorkoutsContext()
    const { dispatch } = useWorkoutsContext()
    const [ title , setTitle ] = useState('')
    const [ load, setLoad ] = useState('')
    const [ reps , setReps ] = useState('')
    const [ error , setError] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {

        if (!user){
            return
        }

     const fetchWorkout = async ()=>{ 
            const response = await fetch('/api/workouts/' + id , {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }

        })

            const json = await response.json()

            if (response.ok){
                
                setTitle(json.title)
                setLoad(json.load)
                setReps(json.reps)
                setError(null)
                }
            if (!response.ok){
                setError(json.error)
                setTitle('')
                setLoad('')
                setReps('')
            }
        }
        fetchWorkout()
    },[user,id])    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const workout = { title, load, reps}

        const response = await fetch('/api/workouts/' + id , {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok){
            return (json.error)
        }

        if (response.ok){
            dispatch({type: 'UPDATE_WORKOUT',payload: json})
            window.location.href = '/'
        }
        
    }
    

    return (
        <form className="workout-details" onSubmit={handleSubmit}>
            <h3>Update Workout id: { title }</h3>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load: </label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button>Update Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default EditWorkout