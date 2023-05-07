import { ClerkProvider } from '@clerk/nextjs';
import NavBar from '../components/NavBar';
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
				<body className='max-w-sm mr-auto ml-auto mt-10'>
					<NavBar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
