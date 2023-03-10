import type { ReactNode } from 'react'
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon'

interface AlertProps {
	children: ReactNode
	variant: 'success' | 'info' | 'warning' | 'error'
}

export default function Alert({ variant, children }: AlertProps) {
	const colors = colorClassNamesForVariant(variant)

	return (
		<div
			className={`flex items-center gap-2 py-2 rounded-r-md ${colors.bgLight} ${colors.borderLeftDark} border-l-4`}
		>
			<AlertIcon
				variant={variant}
				className={`w-6 ml-2 ${colors.textDark} shrink-0`}
			/>
			<p className={`text-sm ${colors.textDark} font-light`}>{children}</p>
		</div>
	)
}

function AlertIcon({
	variant,
	className,
}: {
	variant: AlertProps['variant']
	className: string
}) {
	switch (variant) {
		case 'error':
			return <ExclamationCircleIcon className={className} />
		case 'warning':
			return <ExclamationTriangleIcon className={className} />
		case 'info':
			return <InformationCircleIcon className={className} />
		default:
			return <CheckCircleIcon className={className} />
	}
}

function colorClassNamesForVariant(variant: AlertProps['variant']) {
	switch (variant) {
		case 'error':
			return {
				bgLight: 'bg-red-200',
				borderLeftDark: 'border-l-red-600',
				textDark: 'text-red-600',
			}
		case 'warning':
			return {
				bgLight: 'bg-yellow-200',
				borderLeftDark: 'border-l-yellow-600',
				textDark: 'text-yellow-600',
			}
		case 'info':
			return {
				bgLight: 'bg-blue-200',
				borderLeftDark: 'border-l-blue-600',
				textDark: 'text-blue-600',
			}
		default:
			return {
				bgLight: 'bg-green-200',
				borderLeftDark: 'border-l-green-600',
				textDark: 'text-green-600',
			}
	}
}
