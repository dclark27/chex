'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface CreateNewReceiptProps {
	id: number;
	deleteReceipt(req: { id: number }): void;
}

const DeleteReceiptButton = (props: CreateNewReceiptProps) => {
	const { deleteReceipt, id } = props;

	const [loading, setLoading] = useState(false);

	const handleDeleteReceipt = async () => {
		setLoading(true);
		await deleteReceipt({ id });
	};

	return (
		<Button
			type='submit'
			disabled={loading}
			variant='ghost'
			onClick={handleDeleteReceipt}
		>
			<Trash2 />
		</Button>
	);
};

export default DeleteReceiptButton;
