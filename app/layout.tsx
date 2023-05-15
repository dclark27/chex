import NavBar from '@/components/NavBar';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
	title: 'Chex',
	description: 'Split checks with friends',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className='min-h-screen bg-background font-sans antialiased'>
					<header className='container'>
						<NavBar />
					</header>
					<main className='container'>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
