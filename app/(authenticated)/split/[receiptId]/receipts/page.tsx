import { GET as getDiners } from '@/app/api/diner/route';
import { GET as getItems } from '@/app/api/items/route';
import { GET as getReceipts } from '@/app/api/receipts/route';
import { IndividualReceipt } from '@/components/individual-receipt';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Diner, Receipt, ReceiptItem } from '@prisma/client';
import Link from 'next/link';

async function getItemsForReceipt(req: {
	receiptId: number;
}): Promise<ReceiptItem[]> {
	try {
		const response = await getItems(req);
		const json = await response.json();

		return json;
	} catch (error) {
		return [];
	}
}

async function getReceiptFromId(req: { receiptId: number }): Promise<Receipt> {
	try {
		const response = await getReceipts();
		const json = await response.json();
		const receipt = json.find(
			(receipt: Receipt) => receipt.id === req.receiptId,
		);
		return receipt;
	} catch (error) {
		throw new Error('Receipt not found');
	}
}

async function getDinersForReceipt(req: {
	receiptId: number;
}): Promise<Diner[]> {
	try {
		const response = await getDiners(req);
		const json = await response.json();

		return json;
	} catch (error) {
		return [];
	}
}

export default async function Page({
	params,
}: {
	params: { receiptId: string };
}) {
	const receiptId = params.receiptId;

	const [diners, items, receipt] = await Promise.all([
		getDinersForReceipt({
			receiptId: parseInt(receiptId, 10),
		}),
		getItemsForReceipt({
			receiptId: parseInt(receiptId, 10),
		}),
		getReceiptFromId({
			receiptId: parseInt(receiptId, 10),
		}),
	]);

	return (
		<div className='flex flex-col gap-4'>
			<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
				Receipts
			</h3>
			<div className='flex flex-row gap-5'>
				{diners.map((diner) => (
					<Card key={diner.id} className='w-96'>
						<IndividualReceipt receipt={receipt} diner={diner} items={items} />
					</Card>
				))}
			</div>
			<div className='flex flex-row justify-start'>
				<Link
					href='/receipts'
					className={buttonVariants({ variant: 'default' })}
				>
					Start Over
				</Link>
			</div>
		</div>
	);
}
