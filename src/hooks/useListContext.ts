import { useContext } from "react"
import { ListContext } from "../context/useContextTask"

const useListContext = () => {
  const context = useContext(ListContext)
  if(!context){
    throw new Error('Algo falló')
  }
  return context
}

export default useListContext
