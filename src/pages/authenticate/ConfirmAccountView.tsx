import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react";
import { confirmAccount } from "../../services/authApi"
import { toast } from "react-toastify"
import { dataApi } from "../../types/types"

export type TokenProps ={
  token: string
}

export default function ConfirmAccountView() {

  const [token, setToken]= useState<TokenProps>({
    token: ""
  })

  const handleChange = (token : string)=>{
    setToken({token})
  }

  const handleComplete= async(token : string)=>{
    console.log(token)
    try {
      const response = await confirmAccount({token}) as dataApi
      
      if(response.data){
        toast.success(response.data)
      }
      if(response.error){
        toast.error(response.error)
      }
      
    } catch (error) {
      toast.error('Token no válido')
      
    }
  }
  return (
    <>
      <h1 className="text-2xl font-black text-white lg:text-4xl">Confirma tu Cuenta</h1>
      <p className="mt-5 text-xl font-light text-white">
        Ingresa el código que recibiste {''}
        <span className="font-bold text-fuchsia-500"> por email</span>
      </p>
      <form
        className="p-10 mt-10 space-y-8 bg-white px- rounded-xl"
      >
        <label
          className="block text-2xl font-normal text-center "
        >Código de 6 dígitos</label>

        <div className="flex justify-center gap-3">
          <PinInput value={token.token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
            <PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
          </PinInput>
        </div>

      </form>

      <nav className="flex flex-col mt-10 space-y-4">
        <Link
          to='/auth/new-code'
          className="font-normal text-center text-gray-300"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}
