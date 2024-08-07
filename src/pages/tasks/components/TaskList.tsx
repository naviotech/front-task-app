import { useEffect, useState } from "react"
import useListContext from "../../../hooks/useListContext"
import { deleteTask } from "../../../services/taskApi"
import { dataApi} from "../../../types/types"
import TaskCard from "./TaskCard"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import ModalTaskEdit from "./ModalTaskEdit"
import EditModal from "./components/EditModal"
import EditStatusModal from "./components/EditStatusModal"
import ModalStatus from "./ModalStatus"

type TasklistProps={
  id: string
}

const TaskList = ({id} : TasklistProps) => {
  const params = useParams()
  const [idProject] = useState(params.projectId!)
  const {setId, update, getTasks, pending, setPending, onHold, setOnHold, inProgress, setInProgress, underReview, setUnderReview, completed, setCompleted } = useListContext()
  const [modal, setModal] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  

  const handleClick = () => {
    setModal(!modal)
  }
  const handleClickStatus = () =>{
    setModalStatus(!modalStatus)
  }
  const handleModal=(e: React.MouseEvent<Element, MouseEvent>)=>{
    const target = e.target as HTMLElement
    if(target.matches('.fixed')){
      handleClick()
    }
  }

  const handleModalStatus=(e: React.MouseEvent<Element, MouseEvent>)=>{
    const target = e.target as HTMLElement
    if(target.matches('.fixed')){
      handleClickStatus()
    }
  }
  
  const handleClickDelete = async(id:string)=>{
    const response = await deleteTask({idProject, idTask: id }) as dataApi
    if(response.data){
      toast.success(response.data)
      setPending(pending?.filter(task => task._id !== id))
      setOnHold(onHold?.filter(task => task._id !== id))
      setInProgress(inProgress?.filter(task => task._id !== id))
      setUnderReview(underReview?.filter(task => task._id !== id))
      setCompleted(completed?.filter(task => task._id !== id))
    }
    if(typeof response.error === 'string'){
      toast.error(response.error)
    }
  }

  useEffect(()=>{
    setId(id)
    const showTasks = async() =>{
      await getTasks(id)
    }
    showTasks()

    if(update){
      const updating = async()=>{
        await getTasks(id)
      }
      updating()
    }
  },[id, getTasks, update, setId])
  
  return (
    <section className="flex flex-col items-center justify-center w-full gap-20 mt-20 ex-col lg:gap-10 lg:grid lg:grid-cols-5 lg:items-start">
      <section className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="w-full max-w-screen-sm p-3 text-xl font-light bg-white border border-t-8 border-t-gray-700">Pendiente</h1>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {
            pending?.length ? (
              pending.map((task) => (
                <TaskCard key={task._id} id={task._id} task={task} handleClickDelete={handleClickDelete} handleClick={handleClick} handleClickStatus={handleClickStatus}/>
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
                <TaskCard key={task._id} id={task._id} task={task} handleClickDelete={handleClickDelete} handleClick={handleClick} handleClickStatus={handleClickStatus}/>
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
                <TaskCard key={task._id} id={task._id} task={task} handleClickDelete={handleClickDelete} handleClick={handleClick} handleClickStatus={handleClickStatus}/>
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
                <TaskCard key={task._id} id={task._id} task={task} handleClickDelete={handleClickDelete} handleClick={handleClick} handleClickStatus={handleClickStatus}/>
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
                <TaskCard key={task._id} id={task._id} task={task} handleClickDelete={handleClickDelete} handleClick={handleClick} handleClickStatus={handleClickStatus}/>
              ))
            ) : <p className="text-slate-500">No hay Tareas</p>
          }
        </div>
      </section>
      <article>
      {modal && <ModalTaskEdit handleModal={handleModal} children={<EditModal handleClick={handleClick}/>}/> }
      {modalStatus && <ModalStatus handleModalStatus={handleModalStatus} children={<EditStatusModal handleClickStatus={handleClickStatus}/>}/> }
      </article>
    </section>
  )
}

export default TaskList
