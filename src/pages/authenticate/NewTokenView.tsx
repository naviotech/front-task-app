import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Errors from "../editProject/components/Errors";
import { dataApi, NewTokenForm } from "../../types/types";
import { newToken } from "../../services/authApi";

export default function NewTokenView() {
    const initialValues: NewTokenForm = {
        email: ''
    }

    const { register, handleSubmit,reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleRequestCode = async(email: NewTokenForm) => {
      try{
        const response = await newToken(email) as dataApi
        
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
            <h1 className="text-2xl font-black text-white">Solicitar Código de Confirmación</h1>
            <p className="mt-5 text-xl font-light text-white">
                Coloca tu e-mail para recibir {''}
                <span className="font-bold text-fuchsia-500"> un nuevo código</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="p-10 mt-10 space-y-8 bg-white rounded-lg"
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
                        className="w-full p-3 border border-gray-300 rounded-lg"
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
                    value='Enviar Código'
                    className="w-full p-3 text-xl font-black text-white rounded-lg cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
                />
            </form>

            <nav className="flex flex-col mt-10 space-y-4">
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
                Ya tienes cuenta?
                <Link
                    to='/auth/login'
                    className="font-bold text-violet-600 hover:text-violet-400">
                     Iniciar Sesión
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
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
