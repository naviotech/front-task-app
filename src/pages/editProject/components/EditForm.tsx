import Errors from "./Errors"
import type { FormProjectData } from "../../../types/types"
import { UseFormRegister, FieldErrors } from 'react-hook-form'


type FormPorjectType = {
  register: UseFormRegister<FormProjectData>
  errors: FieldErrors<FormProjectData>
}

const EditForm = ({errors, register}: FormPorjectType) => {
  
  return (
    <>
      <div className="mb-5 space-y-3">
              <label htmlFor="projectName" className="text-sm font-bold uppercase">
                  Nombre del Proyecto
              </label>
              <input
                  id="projectName"
                  className="w-full p-3 border border-gray-200 rounded-xl"
                  type="text"
                  placeholder="Nombre del Proyecto"
                  {...register("projectName", {
                      required: "El Titulo del Proyecto es obligatorio",
                  })}
              />

              {errors.projectName && (
                  <Errors>{errors.projectName.message}</Errors>
              )}
          </div>

          <div className="mb-5 space-y-3">
              <label htmlFor="clientName" className="text-sm font-bold uppercase">
                  Nombre Cliente
              </label>
              <input
                  id="clientName"
                  className="w-full p-3 border border-gray-200 rounded-xl"
                  type="text"
                  placeholder="Nombre del Cliente"
                  {...register("clientName", {
                      required: "El Nombre del Cliente es obligatorio",
                  })}
              />

              {errors.clientName && (
                  <Errors>{errors.clientName.message}</Errors>
              )}
          </div>

          <div className="mb-5 space-y-3">
              <label htmlFor="description" className="text-sm font-bold uppercase">
                  Descripción
              </label>
              <textarea
                  id="description"
                  className="w-full p-3 border border-gray-200 rounded-xl"
                  placeholder="Descripción del Proyecto"
                  {...register("description", {
                      required: "La descripción del proyecto es obligatoria"
                  })}
              />

              {errors.description && (
                  <Errors>{errors.description.message}</Errors>
              )}
          </div>
    </>
  )
}

export default EditForm
