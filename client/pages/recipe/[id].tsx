import type { GetStaticPaths, GetStaticProps } from 'next'
import NextImage from 'next/image'
import { DbRecipe } from 'models/recipe'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import RecentlyViewedRecipes from '@/components/RecentlyViewedRecipes'

interface RecipeProps {
	recipe: DbRecipe
}

export default function Recipe({ recipe }: RecipeProps) {
	return (
		<Container>
			<Grid container spacing={4} sx={{ mt: '2rem' }}>
				<Grid item xs={12} md={8}>
					<Typography variant="h4" component="h1" sx={{ mb: '2rem' }}>
						{recipe.name}
					</Typography>
					<Box
						sx={{
							aspectRatio: '1 / 1',
							position: 'relative',
							maxWidth: '80%',
						}}
					>
						<NextImage
							src={recipe.image.url}
							alt={recipe.image.alt || ''}
							style={{ objectFit: 'cover' }}
							fill
						/>
					</Box>
					<List>
						{recipe.steps.map(step => (
							<ListItem disableGutters key={step}>
								<ListItemText primary={step} />
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs={12} md={4}>
					<RecentlyViewedRecipes />
				</Grid>
			</Grid>
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async context => {
	const res = await fetch(`http://localhost:8080/recipe/${context.params!.id}`)
	const { recipe } = await res.json()
	const notFound = res.status === 404

	return {
		revalidate: 120,
		notFound,
		props: {
			recipe,
		},
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch('http://localhost:8080/recipe')
	const { recipes } = await res.json()

	const paths = recipes.map((recipe: DbRecipe) => ({
		params: { id: recipe._id },
	}))

	return {
		fallback: 'blocking',
		paths,
	}
}
