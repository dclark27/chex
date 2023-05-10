import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const NavBar = () => {
	return (
		<nav className={`flex items-center flex-row mb-4 justify-between pb-5`}>
			<Link href='/'>
				<h3 className='scroll-m-20 text-xl font-extrabold tracking-tight'>
					🥄 Chex
				</h3>
				<small className='text-sm font-medium leading-none'>
					Split checks with friends
				</small>
			</Link>
			<UserButton />
		</nav>
	);
};

export default NavBar;
