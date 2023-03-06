import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'

interface NavigationItemProps {
	href: string
	children?: ReactNode
	largeScreen?: boolean
}

function getClassNames(largeScreen: boolean, active: boolean) {
	if (largeScreen) {
		if (active) {
			return 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
		}
		return 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
	}
	if (active) {
		return 'block rounded-md px-3 py-2 text-base font-medium bg-gray-900 text-white'
	}
	return 'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
}

export default function NavigationItem({
	href,
	children,
	largeScreen = false,
}: NavigationItemProps) {
	const router = useRouter()
	const classNames = getClassNames(largeScreen, router.pathname === href)

	return (
		<Link href={href} className={classNames}>
			{children}
		</Link>
	)
}
