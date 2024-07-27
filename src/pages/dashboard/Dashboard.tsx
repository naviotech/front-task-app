import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllProject } from "../../services/projectApi"
import { DashboardProjectsAll } from "../../types/types"
import GetProjects from "./components/GetProjects"

const Dashboard = () => {
  const [ allProjects, setAllProjects] = useState<DashboardProjectsAll>([])

  useEffect(()=>{
    const getApi = async()=>{
      const response = await getAllProject()
      if(response){
        setAllProjects(response)
      }
    }
    getApi()
  },[])
  return (
    <>
      <h1 className="text-2xl font-bold">Mis Proyectos</h1>
      <p className="mt-5 text-xl text-gray-500">Administra tus proyectos</p>

      <nav className="my-5 mt-16">
        <Link
        className="px-6 py-4 font-bold text-white uppercase transition-colors bg-violet-500 rounded-3xl hover:bg-violet-400"
        to={'/projects/create'}
        >Nuevo proyecto</Link>
      </nav>

      {allProjects.length?  
        <GetProjects data={allProjects}/>
        :
       ( <p className="font-bold text-center lg:mt-52 text-black/50">No hay proyectos todavía</p>)
      } 
    </>
  )
}

export default Dashboard
