import { cookies } from 'next/headers';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/supabase';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AccountForm from '@/components/account-form';
import { Icons } from '@/components/icons';
import NavBar from '@/components/nav-bar';

export default async function Account() {
	const supabase = createServerComponentClient<Database>({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	let { data } = await supabase
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
			<main className='mx-2 flex flex-col'>
				<span className='mb-4 text-sm text-muted-foreground'>
					<Link href='/dashboard' className='flex flex-row items-center gap-2'>
						<Icons.chevronLeft /> Back to Dashboard
					</Link>
				</span>
				<Card>
					<CardHeader className='text-lg font-bold'>
						Edit your profile
					</CardHeader>
					<CardContent>
						<AccountForm session={session} profile={data} />
					</CardContent>
				</Card>
			</main>
		</>
	);
}
