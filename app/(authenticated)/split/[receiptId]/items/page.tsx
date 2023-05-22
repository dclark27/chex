import { FieldArray, FormShape } from '@/components/field-array';
import { Diner } from '@prisma/client';
import {
	DELETE,
	GET as getItems,
	POST as saveItems,
} from '../../../../api/items/route';

async function getDinersForReceipt(req: {
	receiptId: number;
}): Promise<Diner[]> {
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

	const diners = await getDinersForReceipt({
		receiptId: parseInt(receiptId, 10),
	});

	async function createDiners(data: FormShape) {
		'use server';
		await saveItems({
			receiptId: parseInt(receiptId, 10),
			receiptItems: data['item'].map((diner) => ({
				name: diner.value,
				id: diner.locator,
			})),
		});
	}

	async function deleteDiner(data: { id: number }) {
		'use server';
		await DELETE({
			receiptId: parseInt(receiptId, 10),
			receiptItemId: data.id,
		});
	}

	const defaultValues: FormShape = {
		['item']: diners.map((diner) => ({
			value: diner.name,
			locator: diner.id,
		})),
	};

	return (
		<FieldArray
			name='item'
			label='Items'
			nextRoute='prices'
			prevRoute='/items'
			receiptId={receiptId}
			save={createDiners}
			deleteItem={deleteDiner}
			defaultValues={defaultValues}
		/>
	);
}
