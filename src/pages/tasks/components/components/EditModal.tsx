import {useForm} from 'react-hook-form'
import EditForm from './EditForm'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTaskById, updateTask } from '../../../../services/taskApi'
import { dataApi, TaskForm } from '../../../../types/types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


type ModalInfoProps ={
  handleClick : () => void
}


const EditModal = ({handleClick}:ModalInfoProps) => {
  const navigate = useNavigate()
  const params = useParams()
  const [taskId] = useState(params.taskId!)
  const [projectId] = useState(params.projectId!)
  
  const {register , handleSubmit, formState:{errors},reset} = useForm<TaskForm>()

  const handleForm= async(taskData : TaskForm)=>{
    handleClick()
    const response = await updateTask({idProject:projectId, idTask:taskId, formData:taskData}) as dataApi
    if(response.data){
      toast.success(response.data)
    }
    if(typeof response.error === 'string'){
      toast.error(response.error)
    }
    
    navigate(`/projects/${projectId}`)
  }

  useEffect(()=>{
    const getById = async() =>{
      
      const response = await getTaskById({idProject:projectId, idTask:taskId}) as TaskForm
        if(response ){
          reset({
            description: response.description,
            name: response.name
          })
        }
        
      
    }
    getById()
  },[taskId, reset, projectId])
  return (
    <>
      <>
    <form onSubmit={handleSubmit(handleForm)} noValidate className="p-10 mt-10 bg-white rounded-lg shadow-lg">
      <legend className="mb-6 text-2xl font-bold">Editar Tarea</legend>
      <EditForm
      register={register}
      errors={errors}
      />

      <button type="submit"
      className='w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-500 hover:bg-fuchsia-300 rounded-xl'
      >Actualizar Tarea</button>
    </form>
    </>
    </>
  )
}

export default EditModal
