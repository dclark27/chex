import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

interface NavBarProps {
	home?: __next_route_internal_types__.RouteImpl<string>;
}

const NavBar = (props: NavBarProps) => {
	return (
		<nav className='z-40 py-6 flex items-center flex-row mb-4 justify-between pb-5'>
			<Link href={props.home ? props.home : '/'}>
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
