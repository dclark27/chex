import { siteConfig } from '@/config/site';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

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
			<head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</head>
			<body className='bg-zinc-50 dark:bg-zinc-900'>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<div className='overflow-hidden'>{children}</div>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	);
}
