import type { DbUser } from 'models/user'
import Spinner from '@/components/Spinner'

interface AvatarProps {
	user: DbUser | null
}

export default function Avatar({ user }: AvatarProps) {
	return (
		<div className="h-8 w-8 relative rounded-full overflow-hidden">
			{user && (
				<img
					className="w-full h-full"
					src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${user.firstName}`}
					alt=""
				/>
			)}
			{!user && <Spinner className="w-full h-full text-white" />}
		</div>
	)
}
