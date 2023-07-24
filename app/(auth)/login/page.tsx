import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/supabase';
import SignInOrGetStarted from '@/components/sign-in-or-get-started';

export default async function Page() {
	const supabase = createServerComponentClient<Database>({ cookies });
	const session = await supabase.auth.getSession();
	return (
		<SignInOrGetStarted
			isSignedIn={!!session.data.session}
			user={session.data.session?.user}
		/>
	);
}
