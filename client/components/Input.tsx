import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
	label: string
	id: string
	type?: 'email' | 'text' | 'password'
	register: UseFormRegisterReturn
}

export default function Input({
	label,
	id,
	type = 'text',
	register,
}: InputProps) {
	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium pb-2">
				{label}
			</label>
			<input
				id={id}
				type={type}
				{...register}
				className="border px-2 py-1 w-full border-gray-300 rounded-md shadow"
			/>
		</div>
	)
}
