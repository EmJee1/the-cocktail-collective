import { GetStaticPaths, GetStaticProps } from 'next'
import { DbRecipe } from '@models/recipe'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

interface RecipeProps {
	recipe: DbRecipe
}

export default function Recipe({ recipe }: RecipeProps) {
	return (
		<Container>
			<Typography variant="h4" component="h1" sx={{ my: '2rem' }}>
				{recipe.name}
			</Typography>
			<List>
				{recipe.steps.map(step => (
					<ListItem disableGutters key={step}>
						<ListItemText primary={step} />
					</ListItem>
				))}
			</List>
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async context => {
	const res = await fetch(`http://localhost:8080/recipe/${context.params!.id}`)
	const { recipe } = await res.json()

	return {
		revalidate: 120,
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
