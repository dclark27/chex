import { SpeedInsights } from '@vercel/speed-insights/next';

import { siteConfig } from '@/config/site';
import { ModeToggle } from '@/components/mode-toggle';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

import { Toaster } from '@/components/ui/toaster';

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	metadataBase: new URL('https://chex-one.vercel.app/'),
	description: 'Split checks with friends',
	keywords: [
		'Next.js',
		'React',
		'Tailwind CSS',
		'Server Components',
		'Radix UI',
	],
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/en-US',
		},
	},
	openGraph: {
		images: '/og.png',
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head />

			<body className='min-h-screen bg-background font-sans antialiased'>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					{children}
					<TailwindIndicator />
					<div className='group fixed bottom-0 right-0 flex  h-24 w-24 items-end justify-end p-2'>
						<ModeToggle />
					</div>
					<Toaster />
				</ThemeProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
