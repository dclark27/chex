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
	description: 'Split checks with friends',
	keywords: [
		'Next.js',
		'React',
		'Tailwind CSS',
		'Server Components',
		'Radix UI',
	],
	authors: [
		{
			name: 'devin clark',
			url: siteConfig.links.twitter,
		},
	],
	creator: 'devin clark',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [`${siteConfig.url}/og.png`],
		creator: '@devin_clark',
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
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
					<main className='container'>{children}</main>
					<TailwindIndicator />
					<div className='group fixed bottom-0 right-0 flex  h-24 w-24 items-end justify-end p-2'>
						<ModeToggle />
					</div>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
