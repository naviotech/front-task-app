import { z } from 'zod'


// Auth

// eslint-disable-next-line react-refresh/only-export-components
export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  repeat_password: z.string()
})

export type Auth = z.infer<typeof authSchema>
export type NewTokenForm = Pick<Auth, 'email'>
export type UserLogin = Pick<Auth, 'email' | 'password'>
export type UserRegistration = Pick<Auth, 'name' | 'email' | 'password' | 'repeat_password'>

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
  tasks: z.array(z.string())
}))


export const ProjectById = projectSchema.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
  tasks: z.array(z.object({_id: z.string()}))
})
// Api 

export type dataApi = {
  data: string | null
  error: string | null
  
}

// Task
// eslint-disable-next-line react-refresh/only-export-components
export const taskStatus = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

// eslint-disable-next-line react-refresh/only-export-components
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.object({_id: z.string()}),
  status: taskStatus
})

// eslint-disable-next-line react-refresh/only-export-components
export const taskById = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project:  z.string(),
  status: taskStatus
})

// eslint-disable-next-line react-refresh/only-export-components
export const taskByIdStatus = taskById.extend({
  createdAt: z.string(),
  updatedAt: z.string(),
})
// eslint-disable-next-line react-refresh/only-export-components
export type TaskId = z.infer<typeof taskById>
// eslint-disable-next-line react-refresh/only-export-components
export const taskResponse = z.array(taskSchema)
export type TaskByStatus = z.infer<typeof taskByIdStatus>
export type Task = z.infer<typeof taskSchema>
export type TaskForm = Pick<Task, 'name' | 'description'>
export type ProjectType = z.infer<typeof projectSchema>
export type FormProjectData = Pick< ProjectType, 'clientName' | 'description' | 'projectName'>
export type DashboardProjectsAll = z.infer<typeof DashboardProjects>
export type ProjectByIdType = z.infer<typeof ProjectById>
export type TaskStatus = z.infer<typeof taskStatus>