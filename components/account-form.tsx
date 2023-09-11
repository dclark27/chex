'use client';

import { useState } from 'react';
import {
	createClientComponentClient,
	Session,
} from '@supabase/auth-helpers-nextjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { toast } from './ui/use-toast';

const accountSchema = z.object({
	fullname: z.string().min(1, 'Required'),
	username: z.string(),
	website: z.string(),
	avatar_url: z.string().url(),
});

export default function AccountForm({
	session,
	profile,
}: {
	session: Session | null;
	profile: {
		full_name: string | null;
		username: string | null;
		website: string | null;
		avatar_url: string | null;
	};
}) {
	const supabase = createClientComponentClient<Database>();
	const [loading, setLoading] = useState(false);
	const user = session?.user;

	const form = useForm<z.infer<typeof accountSchema>>({
		defaultValues: {
			fullname: profile.full_name ?? '',
			username: profile.username ?? '',
			website: profile.website ?? '',
			avatar_url: profile.avatar_url ?? '',
		},
	});

	const handleSubmit: SubmitHandler<z.infer<typeof accountSchema>> = async (
		data,
	) => {
		try {
			setLoading(true);

			let { error } = await supabase.from('profiles').upsert({
				id: user?.id as string,
				full_name: data.fullname,
				username: data.username,
				website: data.website,
				avatar_url: data.avatar_url,
				updated_at: new Date().toISOString(),
			});
			if (error) throw error;
			toast({
				title: 'Success!',
				description: 'Account updated.',
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='Username' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='fullname'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder='Full name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='website'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Website</FormLabel>
							<FormControl>
								<Input placeholder='Website' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='avatar_url'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Avatar Url</FormLabel>
							<FormControl>
								<Input placeholder='Avatar Url' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-between'>
					<Button type='submit' disabled={loading}>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
}
