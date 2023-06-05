import {
	DELETE,
	GET as getDiners,
	POST as saveDiners,
} from '@/app/api/diner/route';
import { FormShape, PeopleFieldArray } from '@/components/people-field-array';
import { Diner } from '@prisma/client';

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
		name:
			diners && diners.length > 0
				? diners.map((diner) => ({ value: diner.name, locator: diner.id }))
				: [{ value: '' }, { value: '' }],
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
