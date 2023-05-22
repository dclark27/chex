'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';

const SignInOrGetStarted = () => {
	const auth = useAuth();

	return (
		<div className='flex flex-row gap-2 justify-center align-middle'>
			{auth.isSignedIn ? (
				<>
					<Link
						href='/receipts'
						className={buttonVariants({ variant: 'default' })}
					>
						Get Started
					</Link>
				</>
			) : (
				<>
					<SignInButton redirectUrl='/receipts'>
						<Button variant='default'>Get Started</Button>
					</SignInButton>
				</>
			)}
		</div>
	);
};

export default SignInOrGetStarted;
