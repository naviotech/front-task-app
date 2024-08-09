import { useForm } from "react-hook-form";
import { dataApi, UserLogin } from "../../types/types";
import Errors from "../editProject/components/Errors";
import { Link } from "react-router-dom";
import { loginAccount } from "../../services/authApi";
import { toast } from "react-toastify";



export default function LoginView() {

  const initialValues: UserLogin = {
    email: '',
    password: '',
  }
  const { register, handleSubmit,reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = async(formData: UserLogin) => { 
      try{
          const response = await loginAccount(formData) as dataApi
          
          if(response.data){
            toast.success(response.data)
          }
          if(response.error){
            toast.error(response.error)
          }
          reset()
        
      } catch (error) {
        toast.error('Credenciales no válidas')
      }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-10 space-y-8 bg-white rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="text-2xl font-normal"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="email@email.com"
            className="w-full p-3 border border-gray-300 rounded-2xl"
            {...register("email", {
              required: "El Email es obligatorio",
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

        <div className="flex flex-col gap-5">
          <label
            className="text-2xl font-normal"
          >Contraseña</label>

          <input
            type="password"
            placeholder="Ahd7TR8!REs"
            className="w-full p-3 border border-gray-300 rounded-2xl"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <Errors>{errors.password.message}</Errors>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="w-full p-3 text-xl font-black text-white cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700 rounded-2xl"
        />
      </form>


      <nav className="flex flex-col gap-2 mt-10 ">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          Aún no tienes Cuenta?
          <Link
              to='/auth/register'
              className="font-bold text-violet-600 hover:text-violet-400">
                Regístrate
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400">
          Olvidaste tu contraseña?
          <Link
              to='/auth/forgot-password'
              className="font-bold text-violet-600 hover:text-violet-400"
          >
                Reestablecer
          </Link>
        </div>
                
      </nav>
    </>
  )
}
