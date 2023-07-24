import type { Route } from 'next';
import Link from 'next/link';
import { UserCircle } from 'lucide-react';

export default function NavBar<T extends string>({
	href,
}: {
	href: Route<T> | URL;
}) {
	return (
		<nav className='z-40 mb-4 flex flex-row items-center justify-between py-6 pb-5'>
			<Link href={'/dashboard'}>
				<h3 className='scroll-m-20 text-xl font-extrabold tracking-tight'>
					🥄 Chex
				</h3>
				<small className='text-sm font-medium leading-none'>
					Split checks with friends
				</small>
			</Link>
			<Link href='/account'>
				<UserCircle />
			</Link>
		</nav>
	);
}
