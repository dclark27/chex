'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/supabase';

export async function addItem(
	item: Database['public']['Tables']['dish']['Insert'],
) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data, error } = await supabase.from('dish').insert([item]).select();

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath(`/dashboard/${item.receipt_id}`);

	return data;
}

export async function unassignItem(
	diner_id: number,
	dish_id: number,
	receipt_id: string,
) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { error } = await supabase
		.from('diner_dish')
		.delete()
		.eq('diner_id', diner_id)
		.eq('dish_id', dish_id)
		.eq('receipt_id', receipt_id);

	if (error) {
		throw new Error(error.message);
	}

	return {
		success: true,
	};
}

export async function assignItemToDiner(
	diner_id: number,
	dish_id: number,
	receipt_id: string,
) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data, error } = await supabase
		.from('diner_dish')
		.insert([{ diner_id, dish_id, receipt_id }])
		.select();

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export async function getAssignments(receipt_id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const receipt = await getReceipt(receipt_id);

	const { data: assignmentsTable } = await supabase
		.from('diner_dish')
		.select('*')
		.eq('receipt_id', receipt_id);

	return {
		dinerIds: receipt.diners?.map((diner) => diner.id),
		itemIds: receipt.items?.map((item) => item.id),
		assignmentsTable,
	};
}

export async function deleteDiner(diner_id: number, receipt_id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { error } = await supabase.from('diner').delete().eq('id', diner_id);

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath(`/dashboard/${receipt_id}`);

	return {
		success: true,
	};
}

export async function deleteItem(dish_id: number, receipt_id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { error } = await supabase.from('dish').delete().eq('id', dish_id);

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath(`/dashboard/${receipt_id}`);

	return {
		success: true,
	};
}

export async function updateReceipt(
	receipt: Database['public']['Tables']['receipt']['Update'],
	items: Database['public']['Tables']['dish']['Update'][],
	diners: Database['public']['Tables']['diner']['Update'][],
) {
	const supabase = createServerComponentClient<Database>({ cookies });

	if (!receipt.id) {
		throw new Error('No receipt ID provided.');
	}

	const { error } = await supabase
		.from('receipt')
		.update(receipt)
		.eq('id', receipt.id)
		.select();

	if (error) {
		throw new Error('Error updating receipt: ' + error.message);
	}

	diners.forEach(async (diner) => {
		if (diner.id === -1) {
			const { error } = await supabase
				.from('diner')
				.insert({ name: diner.name, receipt_id: receipt.id })
				.select();

			if (error) {
				throw new Error('Error adding diner: ' + error.message);
			}
		} else {
			const { error } = await supabase
				.from('diner')
				.update(diner)
				.eq('id', diner.id)
				.select();
			if (error) {
				throw new Error('Error updating diner: ' + error.message);
			}
		}
	});

	items.forEach(async (item) => {
		if (item.id === -1) {
			const { error } = await supabase
				.from('dish')
				.insert({ ...item, receipt_id: receipt.id })
				.select();

			if (error) {
				throw new Error('Error adding item: ' + error.message);
			}
		} else {
			const { error } = await supabase
				.from('dish')
				.update(item)
				.eq('id', item.id)
				.select();
			if (error) {
				throw new Error('Error updating item: ' + error.message);
			}
		}
	});

	revalidatePath(`/dashboard/${receipt.id}/assignments`);

	return await getReceipt(receipt.id);
}

export async function getReceipt(uuid: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data: receipts } = await supabase
		.from('receipt')
		.select(`*`)
		.eq('id', uuid);

	if (!receipts || !receipts[0]) {
		throw new Error('Receipt not found');
	}

	const receipt = receipts[0];

	const { data: items } = await supabase
		.from('dish')
		.select('*')
		.eq('receipt_id', receipt.id);

	const { data: diners } = await supabase
		.from('diner')
		.select('*')
		.eq('receipt_id', receipt.id);

	const { data: assignmentsTable } = await supabase
		.from('diner_dish')
		.select('*');

	return {
		receipt,
		items,
		diners,
		assignmentsTable,
	};
}
