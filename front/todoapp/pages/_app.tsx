import React from "react";
import { Dispatch, createContext, useState, useEffect } from "react";
import "../styles/global.css";
import JwtTokenContextProvider from "./JwtContext";

export const SAVE_TOKEN_KEY = "tanakasugiyamahyutainamura";

export const API_URL = "localhost:8000";

export const UserContext = createContext(
  {} as {
    user_id: number,
    setId: Dispatch<React.SetStateAction<number>>,
  }
)

// TaskDataの型定義
type TaskData = {
  task_id: number,
  title: string,
  date: string,
  detail: string,
  importance: string,
  progress_id: number,
}

export const TaskContext = React.createContext(
  {} as {
    data: TaskData[],
    setData: Dispatch<React.SetStateAction<TaskData[]>>,
  }
)



// グローバルcssの設定
export default function App({ Component, pageProps }) {
  const [user_id, setId] = useState(0)
  const [data, setData] = useState<TaskData[]>([]);

  return (
    <TaskContext.Provider value={{ data, setData }}>
      <UserContext.Provider value={{ user_id, setId }}>
        <JwtTokenContextProvider>
          <Component {...pageProps} />
        </JwtTokenContextProvider>
      </UserContext.Provider>
    </TaskContext.Provider>
  )

}