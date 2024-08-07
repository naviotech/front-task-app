import {useForm} from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataApi, getTaskByIdStatus, updateTaskStatus } from '../../../../services/taskApi'
import { TaskByStatus, TaskStatus } from '../../../../types/types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useListContext from '../../../../hooks/useListContext'
import StatusForm from './StatusForm'
import { formatedDate } from '../../../../utils/dateFormater'

type ModalInfoProps ={
  handleClickStatus : () => void
}

export type TaskStatusProps = {
  status: TaskStatus
}

const EditStatusModal = ({handleClickStatus}:ModalInfoProps) => {
  const {setUpdate} = useListContext()
  const navigate = useNavigate()
  const params = useParams()
  const [taskId] = useState(params.taskId!)
  const [projectId] = useState(params.projectId!)
  const [status, setStatus] = useState<TaskStatus>()

  const [details, setDetails] = useState({
    name: "",
    description : "",
    createAt: "",
    updatedAt: ""
  })
  
  const {register , handleSubmit, formState:{errors},reset} = useForm<TaskStatusProps>()

  const handleForm= async(taskData : TaskStatusProps)=>{
    handleClickStatus()
    const response = await updateTaskStatus({idProject:projectId, idTask:taskId, formData:taskData}) as DataApi
    
    if(response.data){
      setUpdate(true)
      toast.success(response.data.message)
      navigate(`/projects/${projectId}`)
      
    }
    if(typeof response.error === 'string'){
      toast.error(response.error)
    }
    
    navigate(`/projects/${projectId}`)
  }

  useEffect(()=>{
    const getById = async() =>{
      
      const response = await getTaskByIdStatus({idProject:projectId, idTask:taskId}) as TaskByStatus
      
      if(response ){
        reset({
          status: response.status,
        })
        setStatus(response.status)
        setDetails({
          name: response.name,
          description: response.description,
          createAt: response.createdAt,
          updatedAt: response.updatedAt
        })
      }
        
    }
    getById()
  },[taskId, reset, projectId])
  return (
    <>
      
      <form onSubmit={handleSubmit(handleForm)} noValidate className="p-10 mt-10 bg-white rounded-lg shadow-lg">
        <legend className="mb-6 text-2xl font-bold">Editar Estado</legend>
        <article className='mb-6'>
          <h1 className="text-xl font-bold text-gray-500 capitalize ">{details.name}</h1>
          <p className="text-gray-500 capitalize ">{details.description}</p>
          <div>
            <p className="text-gray-500 capitalize ">Tarea creada:</p>
            <p className='text-sm font-bold text-gray-700'>{formatedDate(details.createAt)}</p>
          </div>
          <div>
            <p className="text-gray-500 capitalize ">Ultima actualización:</p>
            <p className='text-sm font-bold text-gray-700'>{formatedDate(details.updatedAt)}</p>
          </div>
        </article>
        
        
        <StatusForm
        register={register}
        errors={errors}
        status={status || "pending"}
        />

        <button type="submit"
        className='w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-500 hover:bg-fuchsia-300 rounded-xl'
        >Actualizar Estado</button>
      </form>
    
    </>
  )
}

export default EditStatusModal
