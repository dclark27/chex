'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icons } from './icons';
import { Button, buttonVariants } from './ui/button';

export default function NavBar() {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const router = useRouter();
	const logout = async () => {
		setIsLoggingOut(true);
		await fetch('/auth/signout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		})
			.then(() => {
				router.push('/login');
			})
			.finally(() => {
				setIsLoggingOut(false);
			});
	};

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
					<DropdownMenuContent className='flex items-center justify-center flex-col'>
						<DropdownMenuItem>
							<Link
								href='/dashboard'
								className={cn(buttonVariants({ variant: 'ghost' }))}
							>
								<Icons.home className='w-4 h-4 mr-2' />
								Dashboard
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href='/account'
								className={cn(buttonVariants({ variant: 'ghost' }))}
							>
								<Icons.user className='w-4 h-4 mr-2' />
								Edit Profile
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem>
							<Button onClick={logout} variant='ghost' disabled={isLoggingOut}>
								{!isLoggingOut && <Icons.logout className='w-4 h-4 mr-2' />}
								{isLoggingOut && (
									<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
								)}
								Sign out
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}
