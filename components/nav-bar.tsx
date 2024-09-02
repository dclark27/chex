'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { Icons } from './icons';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

export default function NavBar() {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
			toast({
				title: 'Theme changed',
				description: 'Light mode enabled',
			});
		}
		if (theme === 'light') {
			setTheme('system');
			toast({
				title: 'Theme changed',
				description: 'System mode enabled',
			});
		}
		if (theme === 'system') {
			setTheme('dark');
			toast({
				title: 'Theme changed',
				description: 'Dark mode enabled',
			});
		}
	};

	return (
		<nav className='z-50 mb-4 border-b px-4 py-6 pb-5'>
			<Collapsible>
				<div className='flex flex-row items-center justify-between'>
					<Link href={'/dashboard'}>
						<h3 className='scroll-m-20 text-xl font-extrabold tracking-tight'>
							🥄 Chex
						</h3>
						<small className='text-sm font-medium leading-none'>
							Split checks with friends
						</small>
					</Link>

					<CollapsibleTrigger asChild>
						<button className='group relative' onClick={toggleMenu}>
							<div
								className={cn(
									'relative flex h-[50px] w-[50px] transform flex-col items-center justify-center overflow-hidden rounded-full transition-all duration-200',
								)}
							>
								<div
									className={cn(
										'-translate-y-5 transform overflow-hidden transition-all duration-150',
										isOpen ? 'translate-y-3' : '',
									)}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6 animate-bounce text-black dark:text-white'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth='2'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M5 15l7-7 7 7'
										/>
									</svg>
								</div>

								<div className='flex h-[20px] w-[20px] origin-center -translate-y-3 transform flex-col justify-between overflow-hidden transition-all duration-300'>
									<div
										className={cn(
											'mb-1.5 h-[2px] w-7 origin-left transform bg-black transition-all duration-300 dark:bg-white',
											isOpen ? 'translate-y-6' : '',
										)}
									/>
									<div
										className={cn(
											'mb-1.5 h-[2px] w-7 transform rounded bg-black transition-all delay-75 duration-300 dark:bg-white',
											isOpen ? 'translate-y-6' : '',
										)}
									/>
									<div
										className={cn(
											'h-[2px] w-7 origin-left transform bg-black transition-all delay-100 duration-300 dark:bg-white',
											isOpen ? 'translate-y-6' : '',
										)}
									/>
								</div>
							</div>
						</button>
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent>
					<ul className='flex flex-col py-4'>
						<li>
							<Link
								href='/account'
								className='flex cursor-pointer flex-row rounded-sm px-2 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800'
							>
								<Icons.user className='mr-2' />
								<span>Manage Account</span>
							</Link>
						</li>
						<li
							className='flex cursor-pointer flex-row rounded-sm px-2 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800'
							onClick={toggleTheme}
						>
							<Icons.sun className='mr-2' />
							<span>Toggle Dark Mode</span>
						</li>
						<li>
							<form action='/auth/signout' method='post'>
								<button
									type='submit'
									className='flex w-full cursor-pointer flex-row rounded-sm px-2 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800'
								>
									<Icons.logout className='mr-2' />
									<span>Logout</span>
								</button>
							</form>
						</li>
					</ul>
				</CollapsibleContent>
			</Collapsible>
		</nav>
	);
}
