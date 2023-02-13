import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import NextLink from 'next/link'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function SignUp() {
	const onSubmit = async (formValues: Record<string, unknown>) => {
		const res = await fetch('http://localhost:8080/auth/register', {
			method: 'POST',
			body: JSON.stringify(formValues),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await res.json()
		console.log('Response body:', data)
	}

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5" sx={{ mb: 3 }}>
					Sign up
				</Typography>
				<FormContainer onSuccess={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextFieldElement
								required
								autoFocus
								fullWidth
								label="First Name"
								name="firstName"
								autoComplete="given-name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextFieldElement
								required
								fullWidth
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextFieldElement
								required
								fullWidth
								type="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextFieldElement
								required
								fullWidth
								type="password"
								label="Password"
								name="password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" component={NextLink} variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</FormContainer>
			</Box>
		</Container>
	)
}
