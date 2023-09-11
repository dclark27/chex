import { Inter as FontSans } from 'next/font/google';

import { siteConfig } from '@/config/site';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

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
		<>
			<html lang='en' suppressHydrationWarning>
				<head />
				<body
					className={cn(
						'min-h-screen bg-background font-sans antialiased',
						fontSans.variable,
					)}
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<div className='relative flex min-h-screen flex-col'>
							<SiteHeader />
							<div className='flex-1'>{children}</div>
							<SiteFooter />
						</div>
						<TailwindIndicator />
					</ThemeProvider>
					<Toaster />
				</body>
			</html>
		</>
	);
}
