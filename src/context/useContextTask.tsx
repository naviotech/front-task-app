import React, { createContext, ReactNode, useState, useCallback, useEffect } from "react";
import { Task } from "../types/types";
import { getTask } from "../services/taskApi";

// Creo un contexto global para acceder al estado desde cualquier punto (más cómodo)

export type ListContextType = {
  pending: Task[],
  setPending: React.Dispatch<React.SetStateAction<Task[]>>,
  onHold: Task[],
  setOnHold: React.Dispatch<React.SetStateAction<Task[]>>,
  inProgress: Task[],
  setInProgress: React.Dispatch<React.SetStateAction<Task[]>>,
  underReview: Task[],
  setUnderReview: React.Dispatch<React.SetStateAction<Task[]>>,
  completed: Task[],
  setCompleted: React.Dispatch<React.SetStateAction<Task[]>>,
  getTasks: (id: string) => Promise<void>
  update: boolean,
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  id: string | null,
  setId: React.Dispatch<React.SetStateAction<string | null>>
}

type ListProviderProps = {
  children: ReactNode
}

export const ListContext = createContext<ListContextType>({
  pending: [],
  setPending: () => {},
  onHold: [],
  setOnHold: () => {},
  inProgress: [],
  setInProgress: () => {},
  underReview: [],
  setUnderReview: () => {},
  completed: [],
  setCompleted: () => {},
  getTasks: async () => {},
  update: false,
  setUpdate: ()=>{},
  id: null,
  setId: () => {}
  
})

export const ListProvider = ({ children }: ListProviderProps) => {
  const [pending, setPending] = useState<Task[]>([])
  const [onHold, setOnHold] = useState<Task[]>([])
  const [inProgress, setInProgress] = useState<Task[]>([])
  const [underReview, setUnderReview] = useState<Task[]>([])
  const [completed, setCompleted] = useState<Task[]>([])
  const [update, setUpdate] = useState(false)
  const [id, setId] = useState<string | null>(null)

  const getTasks = useCallback(async (id: string) => {
    const response = await getTask(id) as Task[]
    if (response) {
      setPending(response.filter(task => task.status === "pending"))
      setOnHold(response.filter(task => task.status === "onHold"))
      setInProgress(response.filter(task => task.status === "inProgress"))
      setUnderReview(response.filter(task => task.status === "underReview"))
      setCompleted(response.filter(task => task.status === "completed"))
    }
  }, [])

  useEffect(() => {
    if (update && id) {
      const fetchTasks = async () => {
        await getTasks(id);
        setUpdate(false)
      };
      fetchTasks();
    }
  }, [update, getTasks, id])

  return (
    <ListContext.Provider value={{id, setId, update, setUpdate , pending, setPending, onHold, setOnHold, inProgress, setInProgress, underReview, setUnderReview, completed, setCompleted, getTasks }}>
      {children}
    </ListContext.Provider>
  )
}
