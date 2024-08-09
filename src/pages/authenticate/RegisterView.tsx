import { useForm } from "react-hook-form";
import { dataApi, UserRegistration } from "../../types/types";
import Errors from "../editProject/components/Errors";
import { Link } from "react-router-dom";
import { createAccount } from "../../services/authApi";
import { toast } from "react-toastify";


export default function RegisterView() {
  const initialValues: UserRegistration = {
    name: '',
    email: '',
    password: '',
    repeat_password: '',
  }

  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm<UserRegistration>({ defaultValues: initialValues });

  const password = watch('password');

  const handleRegister = async (formData: UserRegistration) => {
    try {
      const response = await createAccount(formData) as dataApi
      if(response.data){
        toast.success(response.data)
      }
      if(response.error){
        toast.error(response.error)
      }
      reset()
    } catch (error) {
      toast.error('Error desconocido')
      reset()
    }
  }

  return (
    <>
      <h1 className="text-3xl font-black text-white">Crear Cuenta</h1>
      <p className="mt-5 text-xl font-light text-white">
        Llena el formulario para {''}
        <span className="font-bold text-fuchsia-500"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="p-10 mt-10 space-y-8 bg-white rounded-2xl"
        noValidate
      >
        
        <div className="flex flex-col gap-5">
          <label
            className="text-2xl font-normal"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de registro"
            className="w-full p-3 border border-gray-300 rounded-2xl"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <Errors>{errors.name.message}</Errors>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="text-2xl font-normal"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
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
        
        <div className="flex flex-col gap-5">
          <label
            className="text-2xl font-normal"
          >Contraseña</label>

          <input
            type="password"
            placeholder="Contraseña de registro"
            className="w-full p-3 border border-gray-300 rounded-2xl"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <Errors>{errors.password.message}</Errors>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="text-2xl font-normal"
          >Repetir contraseña</label>

          <input
            id="repeat_password"
            type="password"
            placeholder="Repite la contraseña"
            className="w-full p-3 border border-gray-300 rounded-2xl"
            {...register("repeat_password", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />

          {errors.repeat_password && (
            <Errors>{errors.repeat_password.message}</Errors>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="w-full p-3 text-xl font-black text-white cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700 rounded-2xl"
        />
      </form>
      
      <nav className="flex flex-col gap-2 mt-10 ">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          Ya tienes Cuenta?
          <Link
              to='/auth/login'
              className="font-bold text-violet-600 hover:text-violet-400">
                Inicia Sesión
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