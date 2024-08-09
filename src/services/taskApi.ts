import api from "../utils/axios"
import { isAxiosError } from "axios"
import { dataApi, taskById, taskByIdStatus, TaskForm, taskResponse} from "../types/types"
import { TaskStatusProps } from "../pages/tasks/components/components/EditStatusModal"

export type CreateTaskProps = {
  formData: TaskForm,
  id: string
}

export const createTask = async({id,formData} : CreateTaskProps)=>{
  try {
    const { data } = await api.post(`/projects/${id}/tasks`, formData)
    
    const response : dataApi = {
      data: data,
      error: null
    }
    return response
  } catch (error) {
    let errorMessage : string 
    
    if (isAxiosError(error) && error?.response?.data?.message) {
      // Es un error de Axios con mensaje de respuesta
      errorMessage = error.response.data.message;
    } else if (error instanceof Error) {
      // Es un error estándar
      errorMessage = error.message;
    } else {
      // Es algún otro tipo de error
      errorMessage = String(error);
    }
    
    const response : dataApi = {
      data: null,
      error: errorMessage
    }
    return response
  }

}

export const getTask = async (id:string)=> {
  try {
    const { data } = await api(`/projects/${id}/tasks`)
    const response = taskResponse.safeParse(data)
    
    if(response.success){
      return response.data
    }
    
  } catch (error) {
    
    let errorMessage : string 
    
    if (isAxiosError(error) && error?.response?.data?.errors[0]?.msg) {
      // Es un error de Axios con mensaje de respuesta
      errorMessage = error.response.data.errors[0].msg
    } else if (error instanceof Error) {
      // Es un error estándar
      errorMessage = error.message
    } else {
      // Es algún otro tipo de error
      errorMessage = String(error)
    }

    return errorMessage
     
  }
}

type DeleteTaskProps={
  idProject: string,
  idTask: string
}
export const deleteTask = async ({idProject, idTask}: DeleteTaskProps)=> {
  try {
    const { data } = await api.delete(`/projects/${idProject}/tasks/${idTask}`)
    const response : dataApi = {
      data: data,
      error: null
    }
    return response
    
  } catch (error) {
    let errorMessage : string 
    
    if (isAxiosError(error) && error?.response?.data?.errors[0]?.msg) {
      // Es un error de Axios con mensaje de respuesta
      errorMessage = error.response.data.errors[0].msg
    } else if (error instanceof Error) {
      // Es un error estándar
      errorMessage = error.message
    } else {
      // Es algún otro tipo de error
      errorMessage = String(error)
    }

    return errorMessage
     
  }
}

type IdTaskProps={
  idProject: string,
  idTask: string
}
export const getTaskById = async ({idProject,idTask}: IdTaskProps)=> {
  try {
    const { data } = await api(`/projects/${idProject}/tasks/${idTask}`)
    
    const response = taskById.safeParse(data)
    
    if(response.success){
      
      return response.data
    }
    
  } catch (error) {
    
    let errorMessage : string 
    
    if (isAxiosError(error) && error?.response?.data?.errors[0]?.msg) {
      // Es un error de Axios con mensaje de respuesta
      errorMessage = error.response.data.errors[0].msg
    } else if (error instanceof Error) {
      // Es un error estándar
      errorMessage = error.message
    } else {
      // Es algún otro tipo de error
      errorMessage = String(error)
    }

    return errorMessage
     
  }
}

export type UpdateTaskProps = {
  formData: TaskForm,
  idProject: string,
  idTask: string
}
export const updateTask = async({idProject,idTask,formData} : UpdateTaskProps)=>{
  try {
    const { data } = await api.put(`/projects/${idProject}/tasks/${idTask}`, formData)
    
    const response : dataApi = {
      data: data,
      error: null
    }
    return response
  } catch (error) {
    let errorMessage : string 
    
    if (isAxiosError(error) && error?.response?.data?.message) {
      // Es un error de Axios con mensaje de respuesta
      errorMessage = error.response.data.message;
    } else if (error instanceof Error) {
      // Es un error estándar
      errorMessage = error.message;
    } else {
      // Es algún otro tipo de error
      errorMessage = String(error);
    }
    
    const response : dataApi = {
      data: null,
      error: errorMessage
    }
    return response
  }

}

export const getTaskByIdStatus = async ({idProject,idTask}: IdTaskProps)=> {
  try {
    const { data } = await api(`/projects/${idProject}/tasks/${idTask}`)
    
    const response = taskByIdStatus.safeParse(data)
    
    if(response.success){
      
      return response.data
    }
    
  } catch (error) {
    
    let errorMessage : string 
    
    if (isAxiosError(error) && error?.response?.data?.errors[0]?.msg) {
      // Es un error de Axios con mensaje de respuesta
      errorMessage = error.response.data.errors[0].msg
    } else if (error instanceof Error) {
      // Es un error estándar
      errorMessage = error.message
    } else {
      // Es algún otro tipo de error
      errorMessage = String(error)
    }

    return errorMessage
     
  }
}

type UpdateTaskStatusProps={
  idProject: string,
  idTask: string,
  formData: TaskStatusProps
}

export type DataApi = {
  data: { message?: string } | null
  error: string | null;
}
export const updateTaskStatus = async({idProject,idTask,formData} : UpdateTaskStatusProps)=>{
  try {
    const { data } = await api.put(`/projects/${idProject}/tasks/${idTask}/status`, formData) as DataApi
    
    const response : DataApi = {
      data: {message: data?.message},
      error: null
    }
    return response
  } catch (error) {
    let errorMessage : string 
    
    if (isAxiosError(error) && error?.response?.data?.message) {
      // Es un error de Axios con mensaje de respuesta
      errorMessage = error.response.data.message;
    } else if (error instanceof Error) {
      // Es un error estándar
      errorMessage = error.message;
    } else {
      // Es algún otro tipo de error
      errorMessage = String(error);
    }
    
    const response : dataApi = {
      data: null,
      error: errorMessage
    }
    return response
  }

}