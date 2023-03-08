import type { DbUser } from 'models/user'

interface AvatarProps {
	user: DbUser
}

export default function Avatar({ user }: AvatarProps) {
	return (
		<img
			className="h-8 w-8 rounded-full"
			src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${user.firstName}`}
			alt=""
		/>
	)
}
