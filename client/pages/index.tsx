import Head from 'next/head'
import type { DbRecipe } from '@models/recipe'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import RecipeCard from '@/components/RecipeCard'

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
					<Typography variant="h4" component="h1" sx={{ margin: '2rem 0' }}>
						The Cocktail Collective
					</Typography>
					<Grid container spacing={2}>
						{recipes.map(recipe => (
							<Grid key={recipe._id.toString()} item xs={12} sm={6} md={4}>
								<RecipeCard recipe={recipe} />
							</Grid>
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
