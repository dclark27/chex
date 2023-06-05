import { GET as getDiners } from '@/app/api/diner/route';
import {
	DELETE,
	GET as getItems,
	POST as saveItems,
} from '@/app/api/items/route';
import { GET as getReceipt } from '@/app/api/receipts/[receiptId]/route';
import { FormShape, ItemsFieldArray } from '@/components/items-field-array';
import { Diner, Prisma, Receipt, ReceiptItem } from '@prisma/client';

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

	const requests = await Promise.all([
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
	const receipt = requests[2];
	const items = requests[1];
	const diners = requests[0];

	async function createItems(data: FormShape) {
		'use server';
		const request = {
			receiptId: parseInt(receiptId, 10),
			receiptItems: data.items.map((item) => ({
				name: item.name,
				price: parseFloat(item.price.replace(/[^0-9]/, '')),
				id: item.locator,
				dinerIds: item.dinerId,
			})),
		};
		await saveItems(request);
	}

	async function deleteItems(data: { id: number }) {
		'use server';
		await DELETE({
			receiptId: parseInt(receiptId, 10),
			receiptItemId: data.id,
		});
	}

	const defaultValues: FormShape = {
		items:
			items && items.length > 0
				? items.map((item) => ({
						name: item.name,
						price: new Prisma.Decimal(item.price).toString(),
						dinerId: item.dinerIds,
						locator: item.id,
				  }))
				: [
						{
							name: '',
							price: '',
							dinerId: [],
							locator: undefined,
						},
						{
							name: '',
							price: '',
							dinerId: [],
							locator: undefined,
						},
				  ],
	};

	return (
		<ItemsFieldArray
			nextRoute='/receipts'
			prevRoute='/items'
			diners={diners}
			receiptId={receiptId}
			subtotal={new Prisma.Decimal(receipt.subtotal || 0).toNumber()}
			save={createItems}
			deleteItem={deleteItems}
			defaultValues={defaultValues}
		/>
	);
}
