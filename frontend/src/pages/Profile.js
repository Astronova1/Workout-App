import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"

const Profile = () => {
    const { user } = useAuthContext()
    const { workouts } = useWorkoutsContext()

    
return(<div className="profile">
 {user && <h3>{user.email}</h3>}
 <p><strong>Total Workotus</strong>: { workouts!= null ? workouts.length : <span>No workouts Added</span> }</p>
</div>)

}

export default Profile