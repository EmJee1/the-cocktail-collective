import Head from 'next/head'
import { Card, Text, CardBody, Heading, Container } from '@chakra-ui/react'

export default function Home() {
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
					<Card>
						<CardBody>
							<Text>
								View a summary of all your customers over the last month.
							</Text>
						</CardBody>
					</Card>
				</Container>
			</main>
		</>
	)
}
