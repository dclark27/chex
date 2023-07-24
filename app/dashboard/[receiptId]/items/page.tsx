import ReceiptForm from '@/components/receipt-form';

import { getReceipt } from '../action';

interface ReceiptPageProps {
	params: { receiptId: string };
}

export default async function Page({ params }: ReceiptPageProps) {
	const receipt = await getReceipt(params.receiptId);
	const receiptDate = new Date(receipt.receipt.receiptDate || Date.now());
	return (
		<>
			<div className='flex flex-row justify-between align-middle'>
				<span className='text-2xl font-semibold'> {receipt.receipt.notes}</span>
				<span className='text-sm'>{receiptDate.toLocaleDateString()}</span>
			</div>

			<ReceiptForm
				items={receipt.items || [{ quantity: 1, price: 0, name: '', id: -1 }]}
				receipt={receipt.receipt}
				diners={receipt.diners || []}
			/>
		</>
	);
}
