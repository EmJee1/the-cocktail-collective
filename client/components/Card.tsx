import type { ReactNode } from 'react'

interface CardProps {
	children: ReactNode
	className?: string
}

export default function Card({ children, className }: CardProps) {
	let classes = 'bg-white sm:rounded-xl shadow-sm mx-auto'
	if (className) {
		classes += ` ${className}`
	}

	return <div className={classes}>{children}</div>
}
