'use client';
import { Receipt } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from './ui/button';

interface CreateNewReceiptProps {
	createReceipt(): Promise<Receipt>;
}

const CreateNewReceipt = (props: CreateNewReceiptProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const { createReceipt } = props;

	const handleCreateReceipt = async () => {
		startTransition(async () => {
			const receipt = await createReceipt();
			router.push(`/split/${receipt.id}/people`);
		});
	};

	return (
		<Button disabled={isPending} onClick={handleCreateReceipt}>
			Create New Receipt
		</Button>
	);
};

export default CreateNewReceipt;
