interface TagProps {
	tag: string
}

export default function Tag({ tag }: TagProps) {
	return (
		<p className="relative z-10 rounded-full inline-block bg-white drop-shadow-sm py-1.5 px-3 text-gray-600">
			{tag}
		</p>
	)
}
