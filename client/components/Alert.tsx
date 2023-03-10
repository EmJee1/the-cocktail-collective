import type { ReactNode } from 'react'
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon'

interface AlertProps {
	children: ReactNode
	variant: 'success' | 'info' | 'warning' | 'error'
}

export default function Alert({ children }: AlertProps) {
	return (
		<div className="flex items-center gap-2 py-2 rounded-r-md bg-red-200 border-l-red-600 border-l-4">
			<ExclamationCircleIcon className="w-6 ml-2 text-red-600 shrink-0" />
			<p className="text-sm text-red-800 font-light">{children}</p>
		</div>
	)
}
