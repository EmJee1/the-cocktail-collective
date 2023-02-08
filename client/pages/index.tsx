import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import type { DbRecipe } from '@models/recipe'
import {
	Card,
	Text,
	CardBody,
	Heading,
	Container,
	SimpleGrid,
	LinkBox,
	LinkOverlay,
	Stack,
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
									<CardBody>
										<Image
											src="https://placekitten.com/300/300"
											alt=""
											width={300}
											height={300}
										/>
										<Stack mt="6" spacing="3">
											<Heading size="md">
												<LinkOverlay
													as={NextLink}
													href={`/recipe/${recipe._id}`}
												>
													{recipe.name}
												</LinkOverlay>
											</Heading>
										</Stack>
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
