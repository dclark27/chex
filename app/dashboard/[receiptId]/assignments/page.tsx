import AssignmentsForm from '@/components/assignments-form';

import { getAssignments, getReceipt } from '../action';

interface ReceiptPageProps {
	params: { receiptId: string };
}

export default async function Page({ params }: ReceiptPageProps) {
	const assignments = await getAssignments(params.receiptId);
	const receipt = await getReceipt(params.receiptId);
	const receiptDate = new Date(receipt.receipt.receiptDate || Date.now());
	return (
		<>
			<div className='flex flex-row justify-between align-middle'>
				<span className='text-2xl font-semibold'> {receipt.receipt.notes}</span>
				<span className='text-sm'>{receiptDate.toLocaleDateString()}</span>
			</div>
			<AssignmentsForm
				receipt={receipt.receipt}
				items={receipt.items || []}
				diners={receipt.diners || []}
				assignments={assignments?.assignmentsTable || []}
			/>
		</>
	);
}
