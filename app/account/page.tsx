import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import AccountForm from '@/components/account-form';
import NavBar from '@/components/nav-bar';

export default async function Account() {
	const supabase = createServerComponentClient<Database>({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	let { data, error, status } = await supabase
		.from('profiles')
		.select(`full_name, username, website, avatar_url`)
		.eq('id', session?.user?.id ?? '')
		.single();

	if (!data) {
		return <h1>Profile not found</h1>;
	}

	return (
		<>
			<NavBar />
			<div className='container max-w-sm'>
				<h1 className='text-2xl font-extrabold mb-10'>Edit your profile</h1>
				<AccountForm session={session} profile={data} />
				<form action='/auth/signout' method='post' className='mt-10'>
					<Button
						className='button block w-full'
						type='submit'
						variant='secondary'
					>
						Sign out
					</Button>
				</form>
			</div>
		</>
	);
}
