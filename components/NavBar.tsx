import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const NavBar = () => {
	return (
		<nav className={`flex items-center flex-row mb-4 justify-between`}>
			<Link href='/'>
				<h3 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl'>
					🥄 Chex
				</h3>
			</Link>
			<UserButton />
		</nav>
	);
};

export default NavBar;
