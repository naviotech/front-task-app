import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProjectById, updateProject } from "../../services/projectApi"
import { dataApi, FormProjectData, ProjectByIdType } from "../../types/types"
import EditForm from "./components/EditForm"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

const EditProject = () => {
  const params = useParams()
  const [id] = useState(params.projectId!)
  const [project, setProject] = useState<ProjectByIdType>()
  const [error, setError] = useState <string>("")
  const navigate = useNavigate()

  const {register, handleSubmit, formState:{errors}, reset} = useForm<FormProjectData>()

  const handleForm = (projectData : FormProjectData) =>{
    
    const updated = async ()=>{
      const response = await updateProject({projectData,id}) as dataApi
      if(response.data){
        toast.success(response.data)
      }
      if(typeof response.error === 'string'){
        toast.error(response.error)
      }
      
      navigate('/')
    }
    updated()
    
  }
  
  useEffect(()=>{
    const getById = async() =>{
      const response = await getProjectById(id)
      if(typeof(response) == "string"){
        setError(response)
      }else{
        setProject(response)
        reset({
          projectName: response?.projectName,
          clientName: response?.clientName,
          description: response?.description,
        });
      }
    }
    getById()
  },[id, reset])
  return (
    <>
      {project && 
        <div className='max-w-3xl mx-auto'>
        <h1 className="text-2xl font-bold">Editar Proyecto</h1>
  
        <form
        className='p-10 mt-10 bg-white rounded-lg shadow-lg'
        onSubmit={handleSubmit(handleForm)}
        noValidate
        >
          <EditForm
            register={register}
            errors={errors}
          />
          <button 
            type='submit'
            className='w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-500 hover:bg-fuchsia-300 rounded-xl'
            >Actualizar Proyecto</button>
        </form>
      </div>
      }
      {error.length ?
      
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-center uppercase text-black/50">Error 404</h1>
          <p className="text-4xl font-bold text-center uppercase text-black/50">{error}</p>
        </div>
        : ""
      }
    </>
  )
}

export default EditProject
