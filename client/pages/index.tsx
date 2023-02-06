import Head from 'next/head'
import NextLink from 'next/link'
import type { DbRecipe } from '@models/recipe'
import {
	Card,
	Text,
	CardBody,
	CardHeader,
	Heading,
	Container,
	SimpleGrid,
	LinkBox,
	LinkOverlay,
} from '@chakra-ui/react'

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
				<Container maxW="7xl">
					<Heading>The Cocktail Collective</Heading>
					<SimpleGrid columns={3} spacing={4}>
						{recipes.map(recipe => (
							<LinkBox key={recipe._id.toString()}>
								<Card>
									<CardHeader>
										<Heading size="md">
											<LinkOverlay as={NextLink} href={`/recipe/${recipe._id}`}>
												{recipe.name}
											</LinkOverlay>
										</Heading>
									</CardHeader>
									<CardBody>
										{recipe.steps.map((step, index) => (
											<Text key={index}>{step}</Text>
										))}
									</CardBody>
								</Card>
							</LinkBox>
						))}
					</SimpleGrid>
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
