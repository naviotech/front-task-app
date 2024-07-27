import { string, z } from 'zod'

// Proyectos
// eslint-disable-next-line react-refresh/only-export-components
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
})

export const DashboardProjects = z.array(projectSchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
  tasks: z.array(string())
}))

export const ProjectById = projectSchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
  tasks: z.array(string())
})
// Api 

export type dataApi = {
  data: string | null
  error: unknown
  
}

export type ProjectType = z.infer<typeof projectSchema>
export type FormProjectData = Pick< ProjectType, 'clientName' | 'description' | 'projectName'>
export type DashboardProjectsAll = z.infer<typeof DashboardProjects>
export type ProjectByIdType = z.infer<typeof ProjectById>