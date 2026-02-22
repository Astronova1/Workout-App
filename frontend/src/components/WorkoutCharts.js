import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const WorkoutCharts = ({workouts}) => {

    if (!workouts){
        return
    }
    const data = []
    for (let i=0; i<workouts.length; i++ ){
        data.push({
            'title': workouts[i].title,
            'reps': workouts[i].reps
        })
    }
 
    return (
         <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey='title'/>
                <YAxis />
                <Tooltip/>
                <Line type="monotone" dataKey='reps' stroke="#8884d8" />
            </LineChart>
         </ResponsiveContainer> 
    )

}

export default WorkoutCharts
