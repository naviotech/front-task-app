import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Header = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleClick = () => {
   setVisible(!visible)
  }
  return (
    <>
      <header className="flex flex-col items-center justify-center py-8 bg-gray-800">
        <div className="flex items-center justify-between w-full max-w-screen-xl ">
          <div className="w-64">
            <Link to={'/'}>
            <img src="/svg/logo.svg" alt="logotipo" title="logotipo web"></img>
            </Link>
            
          </div>
          <nav className="flex items-center justify-end w-full mr-6 ">
            <input type="checkbox" onChange={handleClick} checked={visible} id="menu" className="hidden peer/menu "/>
            <label htmlFor="menu" className="z-20 w-10 h-10 transition-all duration-100 bg-center bg-cover rounded-lg cursor-pointer bg-menu-burguer bg-green-color peer-checked/menu:bg-menu-close md:hidden"></label>

            <div className="absolute right-0 z-10 hidden w-full p-4 py-10 transition-all bg-gray-800 drop top-24 peer-checked/menu:block md:peer-checked/menu:flex md:flex md:flex-row md:gap-4 md:relative md:top-0 md:h-auto md:bg-none md:justify-end md:text-sm md:items-center lg:gap-12">
              <hr className="md:hidden"/>
              <ul className="flex flex-col items-center justify-center gap-2 mt-6 mb-6 text-xl md:flex-row md:p-3 md:gap-8 ">
                <li className="w-full text-white break-normal transition-all duration-200 cursor-pointer hover:text-violet-500 hover:transform md:text-base lg:text-lg md:text-white whitespace-nowrap ">Mi Perfil</li>
                <li className="w-full text-white break-normal transition-all duration-200 cursor-pointer hover:text-violet-500 hover:transform md:text-base lg:text-lg md:text-white whitespace-nowrap"><Link to={"/"} onClick={handleClick}>Mis Proyectos</Link></li>
                <li className="w-full text-white transition-all duration-200 cursor-pointer hover:text-violet-500 hover:transform md:text-base lg:text-lg md:text-white whitespace-nowrap">Cerrar Sesión</li>
              </ul>
              <hr className="md:hidden"/>
              
            </div>
          </nav>
        </div>
      </header>
      <main className="py-5">
        <section className="max-w-screen-xl p-5 mx-auto mt-10">
          <Outlet/>
        </section>
      </main>
      <footer>

      </footer>
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  )
}

export default Header
