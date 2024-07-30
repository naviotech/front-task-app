import { Task } from "../../../types/types"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"

type TaskCardProps = {
  task: Task
  id: string
}

const TaskCard = ({id,task}:TaskCardProps) => {
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
                    <Menu.Item>
                        <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                            Ver Tarea
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                            Editar Tarea
                        </button>
                    </Menu.Item>

                    <Menu.Item>
                        <button type='button' className='block px-3 py-1 text-sm leading-6 text-red-500'>
                            Eliminar Tarea
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
      </div>
    </article>
  )
}

export default TaskCard
