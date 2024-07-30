import { useForm } from "react-hook-form"
import FormTask from "./FormTask"

import { useParams } from "react-router-dom"
import { useState } from "react"
import { dataApi, TaskForm } from "../../../types/types"
import { createTask } from "../../../services/taskApi"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"


type ModalInfoProps ={
  handleClick : () => void
}
const ModalInfo = ({handleClick}: ModalInfoProps) => {
  const initialValues = {
    name:"",
    description: ""
  }
  const {register , handleSubmit, formState:{errors}} = useForm({defaultValues: initialValues})
  const params = useParams()
  const [id] = useState(params.projectId!)
  const navigate = useNavigate()

  const handleForm =async (formData : TaskForm)=>{
    const response = await createTask({id, formData}) as dataApi
    handleClick()
    if(response.data){
      toast.success(response.data)
    }
    if(typeof response.error === 'string'){
      toast.error(response.error)
    }
    
    navigate(`/projects/${id}`)
  } 

  return (
    <>
    <form onSubmit={handleSubmit(handleForm)} noValidate className="p-10 mt-10 bg-white rounded-lg shadow-lg">
      <legend className="mb-6 text-2xl font-bold">Nueva Tarea</legend>
      <FormTask
      register={register}
      errors={errors}
      />

      <button type="submit"
      className='w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-500 hover:bg-fuchsia-300 rounded-xl'
      >Guardar Tarea</button>
    </form>
    </>
    
  )
}

export default ModalInfo
