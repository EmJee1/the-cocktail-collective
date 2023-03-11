import type { AppProps } from 'next/app'
import '@/styles/tailwind.css'
import Layout from '@/components/Layout'
import { UserContextProvider } from '@/components/UserContextProvider'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserContextProvider>
	)
}
