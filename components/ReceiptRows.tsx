'use client';
import { buttonVariants } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Receipt } from '@prisma/client';
import currency from 'currency.js';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { experimental_useOptimistic } from 'react';
import DeleteReceiptButton from './DeleteReceiptButton';

interface Props {
	receipts: Receipt[];
	deleteReceipt(req: { id: number }): void;
}

const ReceiptRows = (props: Props) => {
	const { receipts, deleteReceipt } = props;
	const [optimisticReceipts, deleteOptimisticReceipt] =
		experimental_useOptimistic(
			{
				receipts,
				sending: false,
			},
			(state, newReceipts: Receipt[]) => ({
				...state,
				receipts: newReceipts,
				sending: true,
			}),
		);

	const handleDeleteReceipt = async (req: { id: number }) => {
		deleteOptimisticReceipt(
			optimisticReceipts.receipts.filter((receipt) => receipt.id !== req.id),
		);
		await deleteReceipt({ id: req.id });
	};

	return (
		<>
			{optimisticReceipts.receipts.map((receipt) => (
				<TableRow key={receipt.id}>
					<TableCell>
						{new Date(receipt.date.toString()).toLocaleDateString()}
					</TableCell>
					<TableCell>{currency(receipt.total || 0).format()}</TableCell>
					<TableCell align='right'>
						<Link
							href={`/split/${receipt.id}/people`}
							className={buttonVariants({ variant: 'ghost' })}
						>
							<Pencil />
						</Link>
						<DeleteReceiptButton
							deleteReceipt={handleDeleteReceipt}
							id={receipt.id}
						/>
					</TableCell>
				</TableRow>
			))}
		</>
	);
};

export default ReceiptRows;
