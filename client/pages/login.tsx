import { z } from 'zod'
import { useContext, useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import useZodForm from '@/hooks/use-zod-form'
import { apiRequest } from '@/utils/fetch'
import UserContext from '@/context/user-context'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export default function Login() {
	const { register, handleSubmit, formError, errorByName } = useZodForm(schema)
	const { setToken } = useContext(UserContext)
	const [requestError, setRequestError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const onSubmit = handleSubmit(async values => {
		setLoading(true)
		setRequestError(null)
		const response = await apiRequest<{ token: string }>(
			'/auth/login',
			'POST',
			values
		)

		if (!response.success) {
			setRequestError(response.error)
			setLoading(false)
			return
		}

		console.log('Got the token:', response.data.token)
		setToken(response.data.token)
		setLoading(false)
	})

	return (
		<Card className="py-6 px-4 sm:px-6 max-w-lg">
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				{formError && <Alert variant="error">{formError}</Alert>}
				{requestError && <Alert variant="error">{requestError}</Alert>}
				<Input
					type="email"
					label="Email address"
					id="login-email"
					register={register('email')}
					error={errorByName.email}
				/>
				<Input
					type="password"
					label="Password"
					id="login-password"
					register={register('password')}
					error={errorByName.password}
				/>
				<Button type="submit" loading={loading}>
					Sign in
				</Button>
			</form>
		</Card>
	)
}
