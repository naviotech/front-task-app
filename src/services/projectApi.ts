import { DashboardProjects, FormProjectData, ProjectById } from "../types/types"
import api from "../utils/axios"
import { isAxiosError } from "axios"
import { dataApi } from "../types/types"

export const createProject = async (formdata: FormProjectData)=> {
  try {
    const { data } = await api.post("/projects", formdata)
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

export const getAllProject = async ()=> {
  try {
    const { data } = await api("/projects")
    
    const response = DashboardProjects.safeParse(data)
    
    if(response.success){
      return response.data
      
    }
    
  } catch (error) {
    console.log(error)
    
    
  }
}

export const getProjectById = async (id:string)=> {
  try {
    const { data } = await api(`/projects/${id}`)
    
    const response = ProjectById.safeParse(data)
    
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
type UpdateProps = {
  id: string,
  projectData: FormProjectData
}

export const updateProject = async ({projectData, id}: UpdateProps)=> {
  try {
    const { data } = await api.put(`/projects/${id}`, projectData)
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


export const deleteProject = async (id: string)=> {
  try {
    const { data } = await api.delete(`/projects/${id}`)
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