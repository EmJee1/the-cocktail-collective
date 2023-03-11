import { z } from 'zod'
import Input from '@/components/Input'
import useZodForm from '@/hooks/use-zod-form'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { post } from '@/utils/fetch'
import { useState } from 'react'
import Alert from '@/components/Alert'

const schema = z.object({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	email: z.string().email(),
	password: z.string().min(6),
})

export default function Register() {
	const { formError, register, handleSubmit } = useZodForm(schema)
	const [requestError, setRequestError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const onSubmit = handleSubmit(async values => {
		setLoading(true)
		setRequestError(null)
		const response = await post('/auth/register', values)

		if (!response.success) {
			setRequestError(response.error)
			setLoading(false)
			return
		}

		setLoading(false)
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
		</Card>
	)
}
