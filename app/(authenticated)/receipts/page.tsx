import CreateNewReceipt from '@/components/create-new-receipt-dialog';
import { Receipt } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import {
	POST as createReceipt,
	DELETE as deleteReceipt,
	GET as getReceipts,
} from '../../api/receipts/route';
import { columns } from './columns';
import { DataTable } from './data-table';

async function getReceiptsForUser(): Promise<Receipt[]> {
	try {
		const response = await getReceipts();
		const json = await response.json();

		return json;
	} catch (error) {
		return [];
	}
}

export default async function Page() {
	async function deleteReceiptAction(req: { id: number }) {
		'use server';
		await deleteReceipt(req);
		revalidatePath('/receipts');
	}

	async function createReceiptAction(req: {
		tax: number;
		tip: number;
		subtotal: number;
		notes: string;
		total: number;
		paymentMethod:
			| 'Visa'
			| 'Cash'
			| 'Mastercard'
			| 'American Express'
			| 'Discover'
			| 'Other';
	}) {
		'use server';
		const response = await createReceipt(req);
		const receipt: Receipt = await response.json();
		revalidatePath('/receipts');
		return receipt;
	}

	const receipts = await getReceiptsForUser();

	return (
		<>
			<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mb-5'>
				Receipts
			</h3>
			<div className='mx-auto py-10'>
				<DataTable
					columns={columns}
					data={receipts}
					deleteReceipt={deleteReceiptAction}
				/>
			</div>
			<div className='flex flex-row justify-end mt-5'>
				<CreateNewReceipt createReceipt={createReceiptAction} />
			</div>
		</>
	);
}
