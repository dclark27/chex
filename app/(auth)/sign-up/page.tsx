import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/supabase';
import SignUpForm from '@/components/sign-up-form';

export default async function Page() {
	const supabase = createServerComponentClient<Database>({ cookies });
	const session = await supabase.auth.getSession();
	return (
		<SignUpForm
			isSignedIn={!!session.data.session}
			user={session.data.session?.user}
		/>
	);
}
