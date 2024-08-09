import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { dataApi, NewTokenForm } from "../../types/types";
import Errors from "../editProject/components/Errors";
import { forgotPassword } from "../../services/authApi";
import { toast } from "react-toastify";




export default function ForgotPasswordView() {
  const initialValues: NewTokenForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
  
  const handleForgotPassword = async(formData: NewTokenForm) => {
    try{
      const response = await forgotPassword(formData) as dataApi
      
      if(response.data){
        toast.success(response.data)
      }
      if(response.error){
        toast.error(response.error)
      }
      reset()
      
    } catch (error) {
      toast.error('Usuario ya confirmado o no existe')
      
    }
  }


  return (
    <>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="p-10 space-y-8 bg-white rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="text-2xl font-normal"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border border-gray-300 rounded-2xl"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <Errors>{errors.email.message}</Errors>
          )}
        </div>

        <input
          type="submit"
          value='Enviar código de acceso'
          className="w-full p-3 text-xl font-black text-white cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700 rounded-2xl"
        />
      </form>

      <nav className="flex flex-col gap-2 mt-10 ">
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
          Ya tienes Cuenta?
          <Link
              to='/auth/login'
              className="font-bold text-violet-600 hover:text-violet-400">
                Inicia Sesión
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400">
          Aún no tienes Cuenta?
          <Link
              to='/auth/register'
              className="font-bold text-violet-600 hover:text-violet-400">
                Regístrate
          </Link>
        </div>
      </nav>
    </>
  )
}


