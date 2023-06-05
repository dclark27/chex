import { GET as getDiners } from '@/app/api/diner/route';
import { GET as getItems } from '@/app/api/items/route';
import { GET as getReceipt } from '@/app/api/receipts/[receiptId]/route';
import { Card } from '@/components/ui/card';
import { Diner, Receipt, ReceiptItem } from '@prisma/client';
import Link from 'next/link';
import { IndividualReceipt } from '../../../../../components/individual-receipt';
import { buttonVariants } from '../../../../../components/ui/button';

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
		const response = await getReceipt(req);
		const json = await response.json();

		return json;
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
			{diners.map((diner) => (
				<Card key={diner.id}>
					<IndividualReceipt receipt={receipt} diner={diner} items={items} />
				</Card>
			))}
			<Link href='/receipts' className={buttonVariants({ variant: 'default' })}>
				Start Over
			</Link>
		</div>
	);
}
