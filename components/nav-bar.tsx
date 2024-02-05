import Link from 'next/link';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icons } from './icons';

export default function NavBar() {
	return (
		<nav className='text-black z-40 mb-4 py-6 pb-5 bg-primary rounded-b-2xl w-full px-2'>
			<div className='container flex flex-row items-center justify-between'>
				<Link href={'/dashboard'}>
					<h3 className='scroll-m-20 text-5xl font-extrabold tracking-tight'>
						Chex
					</h3>
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Icons.menu />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Link href='/account' className='flex flex-row'>
								<Icons.user className='w-4 h-4 mr-2' />
								Edit Profile
							</Link>
						</DropdownMenuItem>
						<form action='/auth/signout' method='post'>
							<DropdownMenuItem asChild>
								<button type='submit' className='w-full'>
									<Icons.logout className='w-4 h-4 mr-2' />
									Sign out
								</button>
							</DropdownMenuItem>
						</form>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}
