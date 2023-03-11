import { createContext, Dispatch, SetStateAction } from 'react'
import { DbUser } from 'models/user'

interface UserContextValue {
	user: DbUser | null
	setUser: Dispatch<SetStateAction<UserContextValue['user']>>
	loading: boolean
	setLoading: Dispatch<SetStateAction<UserContextValue['loading']>>
	token: string | null
	setToken: Dispatch<SetStateAction<UserContextValue['token']>>
}

// Default values are set in UserContextProvider.tsx
const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext
