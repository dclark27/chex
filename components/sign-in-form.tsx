'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	createClientComponentClient,
	User,
} from '@supabase/auth-helpers-nextjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Database } from '@/types/supabase';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Icons } from './icons';
import { toast } from './ui/use-toast';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export default function SignInForm({
	isSignedIn,
	user,
}: {
	isSignedIn: boolean;
	user: User | undefined;
}) {
	const router = useRouter();
	const supabase = createClientComponentClient<Database>();
	const [loading, setLoading] = useState(false);
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
		values,
	) => {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
			});
			if (error) {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: error.message ?? 'There was an error signing in.',
				});
			} else {
				router.push('/dashboard');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return isSignedIn ? (
		<div className='flex flex-col gap-2 pt-8'>
			<Button
				type='submit'
				variant='outline'
				onClick={() => {
					supabase.auth.signOut();
					router.refresh();
				}}
			>
				Sign Out
			</Button>
		</div>
	) : (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='Email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder='Password' type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex flex-col gap-2 pt-8'>
					<Button type='submit' disabled={loading}>
						{loading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Sign In
					</Button>
					<span className='text-center'>Or</span>
					<Link
						href='/sign-up'
						className={buttonVariants({ variant: 'outline' })}
					>
						Create Account
					</Link>
				</div>
			</form>
		</Form>
	);
}
