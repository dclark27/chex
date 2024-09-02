import CreateNewReceipt from '@/components/create-new-receipt-dialog';
import { DataTable } from '@/components/data-table';

import { getReceipts } from './action';
import { columns } from './columns';

export default async function Page() {
	const receipts = await getReceipts();

	return (
		<div className='flex flex-col gap-2'>
			<CreateNewReceipt />
		</div>
	);
}
