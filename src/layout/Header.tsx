import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Header = () => {
  return (
    <>
      <header className="bg-gray-800 py-8 flex flex-col justify-center items-center">
        <div className=" w-full max-w-screen-xl flex justify-between items-center">
          <div className="w-64">
            <img src="../../public/svg/logo.svg" alt="logotipo" title="logotipo web"></img>
          </div>
          <nav className="w-full flex justify-end mr-6 items-center  ">
            <input type="checkbox" id="menu" className="peer/menu hidden "/>
            <label htmlFor="menu" className=" w-10 h-10 cursor-pointer bg-menu-burguer bg-cover bg-center bg-green-color rounded-lg peer-checked/menu:bg-menu-close transition-all duration-100 z-20 md:hidden"></label>

            <div className=" drop hidden w-full absolute right-0 top-24 z-10 py-10 p-4 bg-gray-800 peer-checked/menu:block md:peer-checked/menu:flex transition-all md:flex md:flex-row md:gap-4 md:relative md:top-0  md:h-auto md:bg-none md:justify-end md:text-sm md:items-center lg:gap-12">
              <hr className="md:hidden"/>
              <ul className="flex flex-col justify-center items-center gap-2 text-xl mt-6 mb-6 md:flex-row md:p-3 md:gap-8 ">
                <li className="text-white hover:text-violet-500 hover:transform md:text-base transition-all duration-200 cursor-pointer lg:text-lg md:text-white w-full break-normal whitespace-nowrap ">Mi Perfil</li>
                <li className="text-white hover:text-violet-500 hover:transform  md:text-base transition-all duration-200 cursor-pointer lg:text-lg md:text-white w-full break-normal whitespace-nowrap"><Link to={"/"}>Mis Proyectos</Link></li>
                <li className="text-white hover:text-violet-500 hover:transform  md:text-base transition-all duration-200 cursor-pointer lg:text-lg md:text-white w-full whitespace-nowrap">Cerrar Sesión</li>
              </ul>
              <hr className="md:hidden"/>
              
            </div>
          </nav>
        </div>
      </header>
      <main className="py-5">
        <section className="max-w-screen-xl mx-auto mt-10 p-5">
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
