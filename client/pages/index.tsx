import Head from 'next/head'
import NextLink from 'next/link'
import NextImage from 'next/image'
import type { DbRecipe } from '@models/recipe'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

interface HomeProps {
	recipes: DbRecipe[]
}

export default function Home({ recipes }: HomeProps) {
	return (
		<>
			<Head>
				<title>The Cocktail Collective</title>
				<meta
					name="description"
					content="view, enjoy and share your favorite cocktails with the world"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Container>
					<Grid columns={3} spacing={4}>
						{recipes.map(recipe => (
							<Card>
								<CardActionArea
									href={`/recipe/${recipe._id}`}
									component={NextLink}
								>
									<CardContent>
										<Typography gutterBottom variant="h5">
											{recipe.name}
										</Typography>
										{recipe.steps.map(step => (
											<Typography variant="body1">{step}</Typography>
										))}
									</CardContent>
								</CardActionArea>
							</Card>
						))}
					</Grid>
				</Container>
			</main>
		</>
	)
}

export async function getStaticProps() {
	const res = await fetch('http://localhost:8080/recipe')
	const { recipes } = await res.json()

	return {
		revalidate: 60,
		props: {
			recipes,
		},
	}
}
