import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


const AuthLayout = () => {
  return (
    <>
      <section className="min-h-screen px-3 bg-gray-800">
        <article className="flex flex-col items-center justify-center max-w-screen-md py-10 mx-auto lg:py-20">
          <img src="/svg/logo.svg" alt="logotipo" title="logotipo web" className="max-w-[500px]"></img>
          
          <div className="w-full max-w-[450px] px-4 mt-24 min-w-72">
            <Outlet/>
          </div>
        </article>
        <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      </section>
    </>
  )
}

export default AuthLayout
