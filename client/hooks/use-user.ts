import { useContext } from 'react'
import UserContext from '@/context/user-context'

export default function useUser() {
	const context = useContext(UserContext)

	return {
		...context,
	}
}
