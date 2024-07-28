

type ModalProps = {
  
  handleClick: (e: React.MouseEvent) => void
}
const ModalInfo = ({ handleClick}: ModalProps) => {

  return (
    
    <form className="p-10 mt-10 bg-white rounded-lg shadow-lg">
      <legend className="text-xl font-bold">Nueva Tarea</legend>
      <label htmlFor='name'>Titulo</label>
      <input id="name" name="name"></input>
      <button onClick={handleClick}>salir</button>
    </form>
    
  )
}

export default ModalInfo
