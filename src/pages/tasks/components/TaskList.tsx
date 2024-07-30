import { useEffect, useState } from "react"
import { getTask } from "../../../services/taskApi"
import { Task } from "../../../types/types"

type TasklistProps={
  id: string
}

const TaskList = ({id} : TasklistProps) => {
  const [data, setData] = useState<Task[]>()
  useEffect(()=>{
    const getTasks = async(id:string)=>{
      const response = await getTask(id) as Task[]
      if (response){
        setData(response)
      }
    }
    getTasks(id)
  },[id])
  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  )
}

export default TaskList
