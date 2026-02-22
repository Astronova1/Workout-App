import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from "react";

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/workoutForm";
import WorkoutCharts from '../components/WorkoutCharts'
import Filter from '../components/Filter'


const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const [ query, setQuery ] = useState('')
    const [page, setPage] = useState(0)
    const [numOfPages, setNumOfPages] = useState(0)
    const [sort, setSort] = useState(-1)
    const pages = new Array(numOfPages).fill(null).map((v,i)=> i)
    
    const { user } = useAuthContext() 


    useEffect(() => {
        const fetchWorkouts = async() =>{
            const response = await fetch(`/api/workouts/?page=${page}&sort=${sort}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            const { totalPages, workoutsSend } = json

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: workoutsSend})
                setNumOfPages(totalPages)
            }
        }

        if (user){
            fetchWorkouts()
        }

    },[dispatch, user,page, sort])

            const filteredData = workouts ? workouts.filter((workout) => {
            if (query === ''){
                return workout
            }
            return workout.title.toLowerCase().includes(query.toLowerCase())
        }) : []

        console.log('Current sort is:'+ sort)

    return (
        <div className="home">
            <div className="workouts">
                <div className="search">
                    <label>Search</label>
                    <input type="text" placeholder="Search Workout" onChange={(e) => setQuery(e.target.value)}></input>
                    <Filter currentSort={sort} setSort={(newsort)=>setSort(newsort)} />
                </div>
                        <div className="charts">
                    {filteredData && <WorkoutCharts workouts= {filteredData.lenght > 0 ? filteredData : workouts} />}
                </div>
                {filteredData && filteredData.map((wk) =>(
                    <WorkoutDetails key={wk._id} workout={wk}/>
                ))}
                <h5>Page {page+1} of {numOfPages}</h5>
                {pages.map(pageIndex => (
                    <button key={pageIndex} onClick={()=> setPage(pageIndex)}>{pageIndex+1}</button>
                ))}
                {workouts && workouts.length === 0 && <p className="empty-workouts">No workouts to display</p>}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home;