'use client';

import { Receipt } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

interface CreateNewReceiptProps {
	createReceipt(): Promise<Receipt>;
}

const CreateNewReceipt = (props: CreateNewReceiptProps) => {
	const router = useRouter();
	const { createReceipt } = props;

	const [loading, setLoading] = useState(false);

	const handleCreateReceipt = async () => {
		setLoading(true);
		const receipt = await createReceipt();
		router.push(`/split/${receipt.id}/people`);
	};

	return (
		<Button type='submit' disabled={loading} onClick={handleCreateReceipt}>
			Create New Receipt
		</Button>
	);
};

export default CreateNewReceipt;
