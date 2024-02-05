import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/supabase';
import CreateNewReceipt from '@/components/create-new-receipt-dialog';
import { DataTable } from '@/components/data-table';

import { getReceipts } from './action';
import { columns } from './columns';

export default async function Page() {
	const supabase = createServerComponentClient<Database>({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	let { data } = await supabase
		.from('profiles')
		.select(`full_name, username, website, avatar_url`)
		.eq('id', session?.user?.id ?? '')
		.single();
	const receipts = await getReceipts();

	return (
		<>
			<span className='text-2xl font-bold'>Welcome, {data?.full_name}</span>
			<div className='mx-auto py-10'>
				<DataTable
					header='Receipts'
					columns={columns}
					data={receipts || []}
					defaultSort={[{ id: 'created_at', desc: false }]}
					action={<CreateNewReceipt />}
				/>
			</div>
		</>
	);
}
