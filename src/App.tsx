import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./layout/Header"
import Dashboard from "./pages/dashboard/Dashboard"
import ProjectView from "./pages/projects/ProjectView"
import EditProject from "./pages/editProject/EditProject"
import DetailProject from "./pages/detailProject/DetailProject"
import { ListProvider } from "./context/useContextTask"
import AuthLayout from "./layout/AuthLayout"
import LoginView from "./pages/authenticate/LoginView"
import RegisterView from "./pages/authenticate/RegisterView"
import ConfirmAccountView from "./pages/authenticate/ConfirmAccountView"
import NewTokenView from "./pages/authenticate/NewTokenView"
import ForgotPasswordView from "./pages/authenticate/ForgotPasswordView"
import NewPasswordView from "./pages/authenticate/NewPasswordView"


function App() {
  
  return (
    <BrowserRouter>
      <ListProvider>
        <Routes>
          <Route element={< Header/>}>
            <Route path="/" element={<Dashboard/> } index/>
            <Route path="/projects/create" element={<ProjectView/>}/>
            <Route path="/projects/:projectId/edit" element={<EditProject/>}/>
            <Route path="/projects/:projectId" element={<DetailProject/>}/>
            <Route path="/projects/:projectId/:taskId" element={<DetailProject/>}/>
            <Route path="/projects/:projectId/:taskId/status" element={<DetailProject/>}/>
          </Route>

          <Route element={<AuthLayout/>}>
            <Route path='/auth/login' element={<LoginView/>} />
            <Route path='/auth/register' element={<RegisterView/>} />
            <Route path='/auth/confirm-account' element={<ConfirmAccountView/>} />
            <Route path='/auth/new-code' element={<NewTokenView/>} />
            <Route path='/auth/forgot-password' element={<ForgotPasswordView/>} />
            <Route path='/auth/forgot-password' element={<NewPasswordView/>} />
          </Route>
        </Routes>
      </ListProvider>
    </BrowserRouter>
  )
}

export default App
