import { Task } from "../../../types/types"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState } from "react"


type TaskCardProps = {
  task: Task
  id: string
  handleClickDelete : (id: string) => Promise<void>
  handleClick : () => void
}

const TaskCard = ({id,task, handleClickDelete, handleClick}:TaskCardProps) => {
  const navigate = useNavigate()
  const params = useParams()
  const [idProject] = useState(params.projectId!)
  const [taskId] = useState(params.taskId!)
  
  

  const handleEdit = () => {
    handleClick();
    navigate(`/projects/${idProject}/${id}`)
    return taskId
  };
  return (
    <article key={id} className="flex items-center justify-between w-full max-w-screen-sm gap-3 p-5 bg-white border border-slate-300">
      <div className="flex flex-col min-w-0 gap-y-e">
        <button type="button"
        className="text-xl font-bold text-left capitalize text-slate-600"
        >
          {task.name}
        </button>
        <p className="capitalize text-slate-500">{task.description}</p>
      </div>
      <div className="flex shrink-0 gap-x-6">
        <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
            </Menu.Button>
            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className="absolute right-0 z-10 w-56 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu>
                        <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-violet-500'>
                            Ver Tarea
                        </button>
                    </Menu>
                    <Menu>
                        <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-violet-500'
                        onClick={()=>handleEdit()}>
                            Editar Tarea
                        </button>
                    </Menu>

                    <Menu>
                        <button type='button' className='block px-3 py-1 text-sm leading-6 text-red-500 hover:text-red-400'
                        onClick={()=>handleClickDelete(id)}>
                            Eliminar Tarea
                        </button>
                    </Menu>
                </Menu.Items>
            </Transition>
        </Menu>
      </div>
    </article>
  )
}

export default TaskCard
