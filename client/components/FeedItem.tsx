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
		<Link href={`/recipe/${recipe._id}`}>
			<article className="bg-gray-200 p-4 gap-4 rounded-xl flex flex-col md:flex-row">
				<div className="relative w-44 h-44 aspect-square">
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
					<h4>{recipe.name}</h4>
				</div>
			</article>
		</Link>
	)
}
