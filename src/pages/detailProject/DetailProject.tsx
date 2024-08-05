import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { ProjectByIdType } from "../../types/types"
import { getProjectById } from "../../services/projectApi"
import { useNavigate } from "react-router-dom"
import ModalTask from "../tasks/components/ModalTask"
import ModalInfo from "../tasks/components/ModalInfo"
import TaskList from "../tasks/components/TaskList"

const DetailProject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [id] = useState(params.projectId!)
  const [infoProject, setInfoProject] = useState<ProjectByIdType>()
  const [error, setError] = useState<string>("")
  const [modal, setModal] = useState(false)

  const handleClick = () => {
    setModal(!modal)
    
  }
  const handleModal=(e: React.MouseEvent<Element, MouseEvent>)=>{
    const target = e.target as HTMLElement
    if(target.matches('.fixed')){
      handleClick()
    }
    
  }
  useEffect(()=>{
    const getInfo = async(id:string)=>{
      
      const response = await getProjectById(id) as ProjectByIdType
      
      if(typeof(response) === "string"){
        setError(response)
      }else{
        setInfoProject(response)
      }
      
    }
    getInfo(id)
  },[id])
  return (
    <>
      {infoProject && 
          <section>
            <h1 className="text-2xl font-bold capitalize">{infoProject.projectName}</h1>
            <p className="capitalize text-black/50">{infoProject.description}</p>
            <article className="mt-14">
              <nav>
                <button type="button" className="px-6 py-4 font-bold text-white uppercase transition-colors bg-violet-500 rounded-3xl hover:bg-violet-400"
                onClick={()=> {navigate('?newTask=true'),handleClick()}}
                >Agregar Tarea</button>
              </nav>
            </article>
            <div>
              {modal && <ModalTask handleModal={handleModal} children={<ModalInfo handleClick={handleClick}/>}/> }
            </div>
            <article>
              <TaskList id={id}/>
            </article>
          </section>
          
          
      }
      {error? (
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-center uppercase text-black/50">Error 404</h1>
            <p className="text-4xl font-bold text-center uppercase text-black/50">{error}</p>
          </div>
        ) : ""
      }
    </>
  )
}

export default DetailProject
