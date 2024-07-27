import { Fragment, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { DashboardProjectsAll, dataApi } from '../../../types/types'
import { deleteProject } from '../../../services/projectApi'
import { toast } from 'react-toastify'


type GetProyectsProps = {
  data: DashboardProjectsAll
}

const GetProjects = ( {data} : GetProyectsProps) => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState(data)
  
  
  const handleClick = async (id:string)=>{
    const response = await deleteProject(id) as dataApi
    if(response.data){
      toast.success(response.data)
      setProjects(prevProjects => prevProjects.filter(project => project._id !== id))
    }
    if(typeof response.error === 'string'){
      toast.error(response.error)
    }
    
    navigate('/')
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-10 mt-24 border border-gray-100 divide-y divide-gray-100 ">
            {projects && projects.map((project) => (
              <article key={project._id} className="flex justify-between w-full max-w-screen-lg px-5 py-10 bg-white shadow-lg gap-x-6">
                <div className="flex min-w-0 gap-x-4">
                  <div className="flex-auto min-w-0 space-y-2">
                    <Link to={``}
                      className="text-3xl font-bold text-gray-600 cursor-pointer hover:underline"
                    >{project.projectName}</Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center shrink-0 gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems
                        className="absolute right-0 z-10 w-56 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                      >
                        <MenuItem>
                          <Link to={``}
                            className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-violet-500'>
                            Ver Proyecto
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to={`/projects/${project._id}/edit`}
                            className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-violet-500'>
                            Editar Proyecto
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <button
                            type='button'
                            className='block px-3 py-1 text-sm leading-6 text-red-500 hover:text-red-300'
                            onClick={()=>handleClick(project._id)}
                          >
                            Eliminar Proyecto
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </article>
            ))}
      </section>
    </>
  )
}

export default GetProjects
