import Link from 'next/link';
import { buttonVariants } from '../components/ui/button';

export default function Page() {
	return (
		<main className='flex flex-col text-center items-center'>
			<h3 className='scroll-m-20 text-xl font-semibold tracking-tight mb-10'>
				Split checks with friends
			</h3>
			<Link
				href='/split/people'
				className={buttonVariants({ variant: 'default' })}
			>
				Get Started
			</Link>
		</main>
	);
}
