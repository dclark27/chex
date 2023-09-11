import CreateNewReceipt from '@/components/create-new-receipt-dialog';
import { DataTable } from '@/components/data-table';

import { getReceipts } from './action';
import { columns } from './columns';

export default async function Page() {
	const receipts = await getReceipts();

	return (
		<div className='container relative'>
			<DataTable
				header='Receipts'
				columns={columns}
				data={receipts || []}
				defaultSort={[{ id: 'created_at', desc: false }]}
				action={<CreateNewReceipt />}
			/>
		</div>
	);
}
