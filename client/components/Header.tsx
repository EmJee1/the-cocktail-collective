interface HeaderProps {
	title: string
	subtext?: string
}

export default function Header({ title, subtext }: HeaderProps) {
	return (
		<header className="bg-white shadow">
			<div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					{title}
				</h2>
				{subtext && (
					<p className="mt-2 text-lg leading-8 text-gray-600">{subtext}</p>
				)}
			</div>
		</header>
	)
}
