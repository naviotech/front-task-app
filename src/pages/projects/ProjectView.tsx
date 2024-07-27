import { useForm } from 'react-hook-form'
import FormProject from './components/FormPorject'
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
      className='mt-10 bg-white shadow-lg p-10 rounded-lg'
      onSubmit={handleSubmit(handleForm)}
      noValidate
      >
        <FormProject 
          register={register}
          errors={errors}
        />
        <button 
          type='submit'
          className='bg-fuchsia-500 font-bold w-full p-3 text-white uppercase cursor-pointer hover:bg-fuchsia-300 transition-colors rounded-xl'
          >Crear Proyecto</button>
      </form>
    </div>
  )
}

export default ProjectView
