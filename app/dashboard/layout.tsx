import NavBar from '@/components/nav-bar';

interface EditorProps {
	children?: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: EditorProps) {
	return (
		<>
			<NavBar />
			<main className='container'>{children}</main>
		</>
	);
}
