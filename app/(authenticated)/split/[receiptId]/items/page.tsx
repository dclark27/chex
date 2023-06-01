import {
	ItemsFieldArray,
	ItemsFieldArrayFormShape,
} from '@/components/items-field-array';
import { ReceiptItem } from '@prisma/client';
import {
	DELETE,
	GET as getItems,
	POST as saveItems,
} from '../../../../api/items/route';

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

export default async function Page({
	params,
}: {
	params: { receiptId: string };
}) {
	const receiptId = params.receiptId;

	const items = await getItemsForReceipt({
		receiptId: parseInt(receiptId, 10),
	});

	async function createItems(data: ItemsFieldArrayFormShape) {
		'use server';
		const request = {
			receiptId: parseInt(receiptId, 10),
			receiptItems: data.items.map((item) => ({
				name: item.name,
				price: parseFloat(item.price.replace(/[^0-9]/, '')),
				id: item.locator,
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

	const defaultValues: ItemsFieldArrayFormShape = {
		items: items.map((item) => ({
			name: item.name,
			price: item.price.toString(),
			locator: item.id || undefined,
		})),
	};

	return (
		<ItemsFieldArray
			nextRoute='assignments'
			prevRoute='/items'
			receiptId={receiptId}
			save={createItems}
			deleteItem={deleteItems}
			defaultValues={defaultValues}
		/>
	);
}
