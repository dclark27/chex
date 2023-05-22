import CreateNewReceipt from '@/components/create-new-receipt-dialog';
import ReceiptRows from '@/components/receipt-rows';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Receipt } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import {
	POST as createReceipt,
	DELETE as deleteReceipt,
	GET as getReceipts,
} from '../../api/receipts/route';

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
		revalidatePath('/');
	}

	async function createReceiptAction(req: {
		tax: number;
		tip: number;
		subtotal: number;
		total: number;
	}) {
		'use server';
		const response = await createReceipt(req);
		const receipt: Receipt = await response.json();
		revalidatePath('/');
		return receipt;
	}

	const receipts = await getReceiptsForUser();

	return (
		<>
			<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mb-5'>
				Receipts
			</h3>
			<div className='rounded-md border flex flex-col justify-center'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Created Date</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{receipts.length === 0 && (
							<TableRow>
								<TableCell colSpan={3}>No receipts found</TableCell>
							</TableRow>
						)}
						<ReceiptRows
							receipts={receipts}
							deleteReceipt={deleteReceiptAction}
						/>
					</TableBody>
				</Table>
			</div>
			<div className='flex flex-row justify-end mt-5'>
				<CreateNewReceipt createReceipt={createReceiptAction} />
			</div>
		</>
	);
}