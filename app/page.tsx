import CreateNewReceipt from '@/components/CreateNewReceipt';
import { buttonVariants } from '@/components/ui/button';
import { Receipt } from '@prisma/client';
import { Pencil } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import DeleteReceiptButton from '../components/DeleteReceiptButton';
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
		return receipt;
	}

	async function deleteReceiptAction(req: { id: number }) {
		'use server';
		await deleteReceipt(req);
		revalidatePath('/');
	}

	const receipts = await getReceiptsForUser();

	return (
		<main className='flex flex-col text-center items-center'>
			<h3 className='scroll-m-20 text-xl font-semibold tracking-tight mb-10'>
				Split checks with friends
			</h3>
			<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-10'>
				<thead className='text-xs text-gray-700 uppercase  dark:text-gray-400'>
					<tr>
						<th>Created Date</th>
						<th>Amount</th>
						<th className='text-right'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{receipts.length === 0 && (
						<tr>
							<td colSpan={3}>No receipts found</td>
						</tr>
					)}
					{receipts.map((receipt) => (
						<tr
							key={receipt.id}
							className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
						>
							<td>{new Date(receipt.date.toString()).toLocaleDateString()}</td>
							<td>{receipt.total || '$0.00'}</td>
							<td className='flex flex-row justify-end align-middle'>
								<Link
									href={`/split/${receipt.id}/people`}
									className={buttonVariants({ variant: 'ghost' })}
								>
									<Pencil />
								</Link>
								<DeleteReceiptButton
									deleteReceipt={deleteReceiptAction}
									id={receipt.id}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<CreateNewReceipt createReceipt={createReceiptAction} />
		</main>
	);
}
