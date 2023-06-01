import { FormShape, PeopleFieldArray } from '@/components/people-field-array';
import { Diner } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import {
	DELETE,
	GET as getDiners,
	POST as saveDiners,
} from '../../../../api/diner/route';

async function getDinersForReceipt(req: {
	receiptId: number;
}): Promise<Diner[]> {
	try {
		revalidateTag('split/[receiptId]');
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

	const diners = await getDinersForReceipt({
		receiptId: parseInt(receiptId, 10),
	});

	async function createDiners(data: FormShape) {
		'use server';
		await saveDiners({
			receiptId: parseInt(receiptId, 10),
			diners: data.name.map((diner) => ({
				name: diner.value,
				id: diner.locator,
			})),
		});
	}

	async function deleteDiner(data: { id: number }) {
		'use server';
		await DELETE({
			receiptId: parseInt(receiptId, 10),
			dinerId: data.id,
		});
	}

	const defaultValues: FormShape = {
		name: diners.map((diner) => ({ value: diner.name, locator: diner.id })),
	};

	return (
		<PeopleFieldArray
			nextRoute='items'
			prevRoute='/'
			receiptId={receiptId}
			save={createDiners}
			deleteItem={deleteDiner}
			defaultValues={defaultValues}
		/>
	);
}
