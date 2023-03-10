import { z } from 'zod'
import { useState } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import useZodForm from '@/hooks/useZodForm'
import { Post } from '@/utils/fetch'
import { setUserToken } from '@/utils/local-storage'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export default function Login() {
	const { register, handleSubmit, formError, errorByName } = useZodForm(schema)
	const [requestError, setRequestError] = useState<string | null>(null)

	const onSubmit = handleSubmit(async values => {
		setRequestError(null)
		const response = await Post<{ token: string }>('/auth/login', {
			email: values.email,
			password: values.password,
		})

		if (!response.success) {
			setRequestError(response.error)
			return
		}

		setUserToken(response.data.token)
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
				<Button type="submit">Sign in</Button>
			</form>
		</Card>
	)
}
