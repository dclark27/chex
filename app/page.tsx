import CreateNewReceipt from '@/components/CreateNewReceipt';
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
import ReceiptRows from '../components/ReceiptRows';
import {
	POST as createReceipt,
	DELETE as deleteReceipt,
	GET as getReceipts,
} from './api/receipts/route';

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
	async function createReceiptAction() {
		'use server';
		const receiptResponse = await createReceipt();
		const receipt: Receipt = await receiptResponse.json();
		revalidatePath('/');
		return receipt;
	}

	async function deleteReceiptAction(req: { id: number }) {
		'use server';
		await deleteReceipt(req);
		revalidatePath('/');
	}

	const receipts = await getReceiptsForUser();

	return (
		<>
			<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
				Receipts
			</h3>
			<div className='rounded-md border flex flex-col'>
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
				<CreateNewReceipt createReceipt={createReceiptAction} />
			</div>
		</>
	);
}
