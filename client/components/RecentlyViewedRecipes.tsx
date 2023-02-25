import NextImage from 'next/image'
import NextLink from 'next/link'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

export default function RecentlyViewedRecipes() {
	return (
		<>
			<Typography variant="h6" component="h4">
				Recently viewed
			</Typography>
			<List>
				<ListItemButton component={NextLink} href={`/recipe`}>
					<ListItemAvatar>
						<NextImage
							src="https://storage.googleapis.com/the-cocktail-collective-images/2db3b871-f4fb-47a6-8953-f536f71ddf5c.jpeg"
							alt="Cosmopolitan cocktail"
							width={50}
							height={50}
						/>
					</ListItemAvatar>
					<ListItemText primary="Cosmopolitan" />
				</ListItemButton>
			</List>
		</>
	)
}
