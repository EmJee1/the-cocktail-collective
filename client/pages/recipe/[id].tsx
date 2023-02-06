import { GetStaticPaths, GetStaticProps } from 'next'
import { DbRecipe } from '@models/recipe'
import { Heading } from '@chakra-ui/react'

interface RecipeProps {
	recipe: DbRecipe
}

export default function Recipe({ recipe }: RecipeProps) {
	return (
		<>
			<Heading>{recipe.name}</Heading>
		</>
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
