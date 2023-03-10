import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon'
import { ReactNode } from 'react'

interface ButtonProps {
	disabled?: boolean
	loading?: boolean
	fullWidth?: boolean
	children: ReactNode
	type: 'button' | 'submit' | 'reset'
}

export default function Button({
	disabled,
	fullWidth,
	loading,
	children,
	type = 'button',
}: ButtonProps) {
	let className =
		'relative border rounded-md p-2 text-sm font-medium bg-indigo-600 text-white overflow-hidden'
	if (fullWidth) {
		className += ' w-full'
	}

	return (
		<button disabled={disabled || loading} type={type} className={className}>
			{loading && (
				<span className="bg-white text-gray-800 absolute inset-0 w-full h-full flex items-center justify-center">
					<XCircleIcon className="w-6 h-6 animate-spin" />
				</span>
			)}
			{children}
		</button>
	)
}
