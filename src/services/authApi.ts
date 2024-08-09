import api from "../utils/axios"
import { isAxiosError } from "axios"
import { NewTokenForm, UserLogin, UserRegistration } from "../types/types"
import { DataApi } from "./taskApi"
import { TokenProps } from "../pages/authenticate/ConfirmAccountView"

export const createAccount = async(formdata: UserRegistration)=>{
  try {
    const {data} = await api.post('/auth/create-account', formdata) as DataApi
    console.log(data)
    const response : DataApi = {
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

export const confirmAccount = async(token: TokenProps)=>{
  try {
    const {data} = await api.post('/auth/confirm-account', token) as DataApi
    console.log(data)
    const response : DataApi = {
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

export const newToken = async(email: NewTokenForm)=>{
  try {
    const {data} = await api.post('/auth/new_token', email) as DataApi
    console.log(data)
    const response : DataApi = {
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


export const loginAccount = async(dates: UserLogin)=>{
  try {
    const {data} = await api.post('/auth/login', dates) as DataApi
    console.log(data)
    const response : DataApi = {
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