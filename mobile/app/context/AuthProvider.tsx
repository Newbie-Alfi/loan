import React, { createContext, useState } from 'react'

type Props = {
  children: React.ReactNode
}

interface IAuthContext {
  username: string
  setUsername: (u: string) => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string>("")

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
