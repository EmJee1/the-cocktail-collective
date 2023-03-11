import { ReactNode, useEffect, useState } from 'react'
import type { DbUser } from 'models/user'
import UserContext from '@/context/user-context'
import { apiRequest } from '@/utils/fetch'

export function UserContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<DbUser | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchUser() {
			setLoading(true)
			const res = await apiRequest<{ user: DbUser }>('/profile', 'GET')
			if (res.success) {
				setUser(res.data.user)
			}

			setLoading(false)
		}

		void fetchUser()
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser, loading }}>
			{children}
		</UserContext.Provider>
	)
}
