import Link from 'next/link';

const NavBar = () => {
	return (
		<nav className={`flex items-center flex-row mb-4 justify-center text-4xl`}>
			<Link href='/'>
				<h3 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					🥄 Chex
				</h3>
			</Link>
		</nav>
	);
};

export default NavBar;
