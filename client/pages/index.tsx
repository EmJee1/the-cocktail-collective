import Head from 'next/head'
import type { DbRecipe } from 'models/recipe'
import FeedItem from '@/components/FeedItem'

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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{recipes.map(recipe => (
						<FeedItem key={recipe._id} recipe={recipe} />
					))}
				</div>
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
