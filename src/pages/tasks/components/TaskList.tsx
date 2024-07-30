import { useEffect, useState } from "react"
import { getTask } from "../../../services/taskApi"
import { Task } from "../../../types/types"
import TaskCard from "./TaskCard"

type TasklistProps={
  id: string
}


const TaskList = ({id} : TasklistProps) => {
  const [pending, setPending] = useState<Task[]>()
  const [onHold, setOnHold] = useState<Task[]>()
  const [inProgress, setInProgress] = useState<Task[]>()
  const [underReview, setUnderReview] = useState<Task[]>()
  const [completed, setCompleted] = useState<Task[]>()
  

  useEffect(()=>{
    const getTasks = async(id:string)=>{
      const response = await getTask(id) as Task[]
      if (response){
        setPending(response.filter(task=> task.status === "pending"))
        setOnHold(response.filter(task=> task.status === "onHold"))
        setInProgress(response.filter(task=> task.status === "inProgress"))
        setUnderReview(response.filter(task=> task.status === "underReview"))
        setCompleted(response.filter(task=> task.status === "completed"))
      }
    }
    getTasks(id)
  },[id])
  return (
    <section className="flex flex-col items-center justify-center w-full gap-20 mt-20 ex-col lg:gap-10 lg:grid lg:grid-cols-5 lg:items-start">
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="w-full max-w-screen-sm p-3 text-xl font-light bg-white border border-t-8 border-t-gray-700">Pendiente</h1>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {
            pending?.length ? (
              pending.map((task) => (
                <TaskCard key={task._id} id={task._id} task={task}/>
              ))
            ) : <p className="text-slate-500">No hay Tareas</p>
          }
        </div>
        
      </section>
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="w-full max-w-screen-sm p-3 text-xl font-light bg-white border border-t-8 border-t-red-500" >En Espera</h1>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {
            onHold?.length ? (
              onHold.map((task) => (
                <TaskCard key={task._id} id={task._id} task={task}/>
              ))
            ) : <p className="text-slate-500">No hay Tareas</p>
          }
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="w-full max-w-screen-sm p-3 text-xl font-light bg-white border border-t-8 border-t-blue-500">En Progresso</h1>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {
            inProgress?.length ? (
              inProgress.map((task) => (
                <TaskCard key={task._id} id={task._id} task={task}/>
              ))
            ) : <p className="text-slate-500">No hay Tareas</p>
          }
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="w-full max-w-screen-sm p-3 text-xl font-light bg-white border border-t-8 border-t-yellow-500">En Revisión</h1>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {
            underReview?.length ? (
              underReview.map((task) => (
                <TaskCard key={task._id} id={task._id} task={task}/>
              ))
            ) : <p className="text-slate-500">No hay Tareas</p>
          }
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="w-full max-w-screen-sm p-3 text-xl font-light bg-white border border-t-8 border-t-green-500">Completado</h1>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {
            completed?.length ? (
              completed.map((task) => (
                <TaskCard key={task._id} id={task._id} task={task}/>
              ))
            ) : <p className="text-slate-500">No hay Tareas</p>
          }
        </div>
      </section>
    </section>
  )
}

export default TaskList
