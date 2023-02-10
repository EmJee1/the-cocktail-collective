import Head from 'next/head'
import NextLink from 'next/link'
import NextImage from 'next/image'
import type { DbRecipe } from '@models/recipe'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'

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
					<Typography variant="h3" component="h1">
						The Cocktail Collective
					</Typography>
					<Grid container spacing={2}>
						{recipes.map(recipe => (
							<Grid key={recipe._id.toString()} item xs={12} sm={6} md={4}>
								<Card>
									<CardActionArea
										href={`/recipe/${recipe._id}`}
										component={NextLink}
									>
										<CardMedia sx={{ height: 300 }}>
											<div
												style={{
													position: 'relative',
													width: '100%',
													height: '100%',
												}}
											>
												<NextImage
													src="https://placekitten.com/g/400/400"
													alt=""
													fill
													style={{ objectFit: 'cover' }}
												/>
											</div>
										</CardMedia>
										<CardContent>
											<Typography gutterBottom variant="h5">
												{recipe.name}
											</Typography>
											{recipe.steps.map((step, i) => (
												<Typography key={i} variant="body1">
													{step}
												</Typography>
											))}
										</CardContent>
									</CardActionArea>
								</Card>
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
