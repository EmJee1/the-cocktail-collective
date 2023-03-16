import { z } from 'zod'
import Input from '@/components/Input'
import useZodForm from '@/hooks/use-zod-form'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { apiRequest } from '@/utils/fetch'
import { useContext, useState } from 'react'
import Alert from '@/components/Alert'
import UserContext from '@/context/user-context'
import Link from 'next/link'

const schema = z.object({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	email: z.string().email(),
	password: z.string().min(6),
})

export default function Register() {
	const { formError, register, handleSubmit } = useZodForm(schema)
	const { setToken } = useContext(UserContext)
	const [requestError, setRequestError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const onSubmit = handleSubmit(async values => {
		setLoading(true)
		setRequestError(null)
		const response = await apiRequest<{ token: string }>(
			'/auth/register',
			'POST',
			values
		)

		if (!response.success) {
			setRequestError(response.error)
			setLoading(false)
			return
		}

		setLoading(false)
		setToken(response.data.token)
	})

	return (
		<Card className="py-6 px-4 sm:px-6 max-w-lg">
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				{formError && <Alert variant="error">{formError}</Alert>}
				{requestError && <Alert variant="error">{requestError}</Alert>}
				<Input
					label="First Name"
					id="register-firstname"
					register={register('firstName')}
				/>
				<Input
					label="Last Name"
					id="register-lastname"
					register={register('lastName')}
				/>
				<Input
					label="Email address"
					id="register-email"
					type="email"
					register={register('email')}
				/>
				<Input
					label="Password"
					id="register-password"
					type="password"
					register={register('password')}
				/>
				<Button type="submit" loading={loading}>
					Register
				</Button>
			</form>
			<p className="mt-4 block text-sm">
				Already have an account?&nbsp;
				<Link href="/login" className="text-indigo-600 underline">
					Sign in
				</Link>
			</p>
		</Card>
	)
}
