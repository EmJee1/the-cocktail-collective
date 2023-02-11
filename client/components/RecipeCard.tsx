import NextLink from 'next/link'
import NextImage from 'next/image'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { DbRecipe } from '@models/recipe'

interface RecipeCardProps {
	recipe: DbRecipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
	return (
		<Card>
			<CardActionArea href={`/recipe/${recipe._id}`} component={NextLink}>
				<CardMedia sx={{ height: 300 }}>
					<div
						style={{
							position: 'relative',
							width: '100%',
							height: '100%',
						}}
					>
						<NextImage
							src={recipe.image.url}
							alt={recipe.image.alt ?? `${recipe.name} cocktail`}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
				</CardMedia>
				<CardContent>
					<Typography gutterBottom variant="h6">
						{recipe.name}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
