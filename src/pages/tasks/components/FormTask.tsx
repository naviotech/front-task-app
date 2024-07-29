import { TaskForm } from "../../../types/types"
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import Error from "../../projects/components/Error"

type FormTaskProps={
  register: UseFormRegister<TaskForm>
  errors: FieldErrors<TaskForm>
}
const FormTask = ({register,errors}: FormTaskProps) => {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor='name' className="text-sm font-bold uppercase">Nombre</label>
        <input id="name"
        placeholder="Nombre de la tarea"
        className="w-full p-3 border border-gray-200 rounded-xl"
        {...register("name", {
          required: "El nombre de la tarea es obligatorio",
        })}
        />
        {errors.name && (
                  <Error>{errors.name.message}</Error>
              )}
      </div>
      <div className="mb-5 space-y-3">
        <label htmlFor='description' className="text-sm font-bold uppercase"
        >Descripción</label>
        <textarea
          id="description"
          className="w-full p-3 border border-gray-200 rounded-xl"
          placeholder="Descripción de la tarea"
          {...register("description", {
              required: "La descripción de la tarea es obligatoria"
          })}
      />
        {errors.description && (
                  <Error>{errors.description.message}</Error>
              )}
      </div>
    </>
  )
}

export default FormTask
