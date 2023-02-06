import Head from 'next/head'
import {
	Card,
	Text,
	CardBody,
	CardHeader,
	Heading,
	Container,
} from '@chakra-ui/react'

export interface Recipe {
	name: string
	imageUrl?: string
	ingredients: string[]
	steps: string[]
	author: string
}

interface HomeProps {
	recipes: Recipe[]
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
					<Heading>Hello, pages!</Heading>
					{recipes.map(recipe => (
						<Card>
							<CardHeader>
								<Heading size="md">{recipe.name}</Heading>
							</CardHeader>
							<CardBody>
								{recipe.steps.map(step => (
									<Text>{step}</Text>
								))}
							</CardBody>
						</Card>
					))}
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
