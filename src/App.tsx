import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./layout/Header"
import Dashboard from "./pages/dashboard/Dashboard"
import ProjectView from "./pages/projects/ProjectView"
import EditProject from "./pages/editProject/EditProject"
import DetailProject from "./pages/detailProject/DetailProject"
import { ListProvider } from "./context/useContextTask"


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
        </Routes>
      </ListProvider>
    </BrowserRouter>
  )
}

export default App
