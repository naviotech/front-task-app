import { TaskStatus } from "../../../../types/types"
import Error from "../../../projects/components/Error"
import { TaskStatusProps } from "./EditStatusModal"
import { UseFormRegister, FieldErrors } from 'react-hook-form'

type FormTaskProps={
  register: UseFormRegister<TaskStatusProps>
  errors: FieldErrors<TaskStatusProps>
  status: TaskStatus
}

const StatusForm = ({errors, register, status}: FormTaskProps) => {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor='status' className="text-sm font-bold uppercase"
        >Estado Actual:</label>
        <select
          id="status"
         
          className="w-full p-3 border border-gray-200 rounded-xl"
          {...register("status", {
              required: "El estado es Obligatorio"
          })}
          defaultValue={status}
        >
          <option value="pending">Pendiente</option>
          <option value="inProgress">En Progreso</option>
          <option value="completed">Completado</option>
          <option value="onHold">En Espera</option>
        </select>
        
        {errors.status && (
                  <Error>{errors.status.message}</Error>
              )}
      </div>
    </>
  )
}

export default StatusForm
