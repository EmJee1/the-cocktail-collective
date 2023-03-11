import { ReactNode, useEffect, useState } from 'react'
import type { DbUser } from 'models/user'
import UserContext from '@/context/user-context'
import { apiRequest } from '@/utils/fetch'
import {
	getUserToken,
	removeUserToken,
	setUserToken,
} from '@/utils/local-storage'

export function UserContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<DbUser | null>(null)
	const [loading, setLoading] = useState(false)
	const [token, setToken] = useState<string | null>(null)
	const [firstRun, setFirstRun] = useState(true)

	useEffect(() => {
		async function fetchUser() {
			// Get user-token from localstorage in the first run
			if (firstRun) {
				setToken(getUserToken())
				setFirstRun(false)
				return
			}

			if (!token) {
				setUser(null)
				removeUserToken()
				return
			}

			setLoading(true)
			setUserToken(token)

			const res = await apiRequest<{ user: DbUser }>('/profile', 'GET')
			if (res.success) {
				setUser(res.data.user)
			} else {
				// Remove token if the server does not return a successful response
				removeUserToken()
				setToken(null)
			}

			setLoading(false)
		}

		void fetchUser()
	}, [token])

	return (
		<UserContext.Provider
			value={{ user, setUser, loading, setLoading, token, setToken }}
		>
			{children}
		</UserContext.Provider>
	)
}
