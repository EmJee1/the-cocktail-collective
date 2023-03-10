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
		'border rounded-md px-2 py-2 text-sm font-medium bg-indigo-600 text-white'
	if (fullWidth) {
		className += ' w-full'
	}

	return (
		<button disabled={disabled} type={type} className={className}>
			{children}
		</button>
	)
}
