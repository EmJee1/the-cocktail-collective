import type { DbRecipe } from 'models/recipe'
import Image from 'next/image'
import Link from 'next/link'
import Tag from '@/components/Tag'

interface RecipeFeedItemProps {
	recipe: DbRecipe
}

export default function FeedItem({ recipe }: RecipeFeedItemProps) {
	const date = new Date()

	return (
		<Link
			href={`/recipe/${recipe._id}`}
			className="mx-auto w-full sm:max-w-md bg-white sm:rounded-xl shadow-sm hover:shadow-md transition-shadow"
		>
			<article className="max-w-md sm:max-w-none mx-auto flex flex-col gap-4 p-6 gap-4">
				<div className="relative w-full aspect-square">
					<Image
						src={recipe.image.url}
						alt={recipe.image.alt}
						fill
						className="object-cover rounded-xl"
					/>
				</div>
				<div className="">
					<div className="text-xs flex items-center gap-4">
						<time className="text-gray-500 inline-block">
							{date.toDateString()}
						</time>
						<Tag tag="Fruity" />
					</div>
					<h4 className="mt-1 text-lg font-semibold leading-6 text-gray-900">
						{recipe.name}
					</h4>
					<p>
						{recipe.ingredients.map(ingredient => ingredient.name).join(', ')}
					</p>
				</div>
			</article>
		</Link>
	)
}
