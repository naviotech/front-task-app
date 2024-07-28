import { useForm } from 'react-hook-form'
import FormProject from './components/FormProject'
import { FormProjectData } from '../../types/types'
import { createProject } from '../../services/projectApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const ProjectView = () => {
  const navigate = useNavigate()

  const initialValues : FormProjectData = {
    projectName: "",
    clientName: "",
    description: ""
  }
  const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:initialValues})

  const handleForm = async (data: FormProjectData) =>{
    const response = await createProject(data)
    if(response.data){
      toast.success(response.data)
    }
    if(typeof response.error === 'string'){
      toast.error(response.error)
    }
    
    navigate('/')
  }
  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className="text-2xl font-bold">Crear Proyecto</h1>

      <form
      className='p-10 mt-10 bg-white rounded-lg shadow-lg'
      onSubmit={handleSubmit(handleForm)}
      noValidate
      >
        <FormProject 
          register={register}
          errors={errors}
        />
        <button 
          type='submit'
          className='w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-500 hover:bg-fuchsia-300 rounded-xl'
          >Crear Proyecto</button>
      </form>
    </div>
  )
}

export default ProjectView
