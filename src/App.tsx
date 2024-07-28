import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./layout/Header"
import Dashboard from "./pages/dashboard/Dashboard"
import ProjectView from "./pages/projects/ProjectView"
import EditProject from "./pages/editProject/EditProject"
import DetailProject from "./pages/detailProject/DetailProject"


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={< Header/>}>
          <Route path="/" element={<Dashboard/> } index/>
          <Route path="/projects/create" element={<ProjectView/>}/>
          <Route path="/projects/:projectId/edit" element={<EditProject/>}/>
          <Route path="/projects/:projectId" element={<DetailProject/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
