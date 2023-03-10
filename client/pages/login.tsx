import { z } from 'zod'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import useZodForm from '@/hooks/useZodForm'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export default function Login() {
	const { register, handleSubmit, error, errorByName } = useZodForm(schema)

	const onSubmit = handleSubmit(async values => {
		const res = await fetch('http://localhost:8080/auth/login', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				email: values.email,
				password: values.password,
			}),
		})

		if (!res.ok) {
			// TODO: handle error
			return
		}

		const body = await res.json()
	})

	return (
		<Card className="py-6 px-4 sm:px-6 max-w-lg">
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				{error && <Alert variant="error">{error}</Alert>}
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
				<Button type="submit">Sign in</Button>
			</form>
		</Card>
	)
}
