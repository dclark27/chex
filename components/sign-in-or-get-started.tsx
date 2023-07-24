'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	createClientComponentClient,
	User,
} from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Database } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export default function SignInOrGetStarted({
	isSignedIn,
	user,
}: {
	isSignedIn: boolean;
	user: User | undefined;
}) {
	const router = useRouter();
	const supabase = createClientComponentClient<Database>();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		await supabase.auth.signInWithPassword({
			email: values.email,
			password: values.password,
		});
		router.refresh();
	}

	const onError = (errors: any) => {
		console.log(errors);
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
			<form
				onSubmit={form.handleSubmit(onSubmit, onError)}
				className='space-y-2'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
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
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='Password' type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex flex-col gap-2 pt-8'>
					<Button type='submit'>Sign In</Button>
					<span className='text-center'>Or</span>
					<Button type='submit' variant='outline'>
						Create Account
					</Button>
				</div>
			</form>
		</Form>
	);
}
