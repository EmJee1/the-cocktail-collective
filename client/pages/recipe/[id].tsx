import type { GetStaticPaths, GetStaticProps } from 'next'
import { DbRecipe } from 'models/recipe'

interface RecipeProps {
	recipe: DbRecipe
}

export default function Recipe({ recipe }: RecipeProps) {
	return (
		<div>
			<h4>{recipe.name}</h4>
			<img src={recipe.image.url} alt={recipe.image.alt || ''} />
			{recipe.steps.map(step => (
				<p key={step}>{step}</p>
			))}
		</div>
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
