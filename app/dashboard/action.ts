'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import {
	AzureKeyCredential,
	DocumentAnalysisClient,
} from '@azure/ai-form-recognizer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { env } from '@/env.mjs';
import {
	PrebuiltReceiptModel,
	ReceiptCreditCardFields,
} from '@/types/azure-orc.t';
import { Database } from '@/types/supabase';

export async function getReceipts() {
	const supabase = createServerComponentClient<Database>({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data } = await supabase.from('receipt').select(`*`);

	return data;
}

export async function createReceipt(
	request: Database['public']['Tables']['receipt']['Insert'],
) {
	const supabase = createServerComponentClient<Database>({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const response = await supabase
		.from('receipt')
		.insert([
			{
				...request,
				user_id: session?.user.id,
			},
		])
		.select();

	revalidatePath('/dashboard');

	return response;
}

export async function updateReceipt(
	request: Database['public']['Tables']['receipt']['Update'],
) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data, error } = await supabase
		.from('receipt')
		.update({ ...request })
		.eq('id', request.id ?? '')
		.select();

	revalidatePath('/dashboard');

	return data;
}

export async function deleteReceipt(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	await supabase.from('receipt').delete().eq('id', id).select();

	revalidatePath('/dashboard');

	return true;
}

export async function processReceipt(url: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const endpoint = env.VISION_ENDPOINT || '<endpoint>';
	const credential = new AzureKeyCredential(env.VISION_KEY || '<api key>');

	const client = new DocumentAnalysisClient(endpoint, credential);

	const poller = await client.beginAnalyzeDocumentFromUrl(
		PrebuiltReceiptModel,
		// The form recognizer service will access the following URL to a receipt image and extract data from it
		url,
	);

	const {
		documents: [document],
	} = await poller.pollUntilDone();

	// Use of PrebuiltModels.Receipt above (rather than the raw model ID), as it adds strong typing of the model's output
	if (document) {
		const { merchantName, items, total, subtotal, totalTax, transactionDate } =
			document.fields as ReceiptCreditCardFields;

		const { data: receipt } = await createReceipt({
			created_at: new Date().toISOString(),
			notes: merchantName && merchantName.value,
			receiptDate: transactionDate && transactionDate.value?.toISOString(),
			receiptImageUrl: url,
			total: total && total.value,
			subtotal: subtotal && subtotal.value,
			tax: totalTax && totalTax.value,
			user_id: session?.user.id,
		});

		if (!receipt || !receipt[0]) {
			throw new Error('Could not create receipt.');
		}

		for (const item of (items && items.values) || []) {
			const { description, totalPrice, quantity } = item.properties;
			const supabase = createServerComponentClient<Database>({ cookies });

			const { data: dish, error } = await supabase
				.from('dish')
				.insert([
					{
						receipt_id: receipt[0].id,
						name: description && description.value,
						price: totalPrice && totalPrice.value,
						quantity: quantity ? quantity.value : 1,
					},
				])
				.select();

			if (!dish || !dish[0]) {
				throw new Error(error?.message || 'Could not create dish.');
			} else {
				console.log('Created dish', dish[0]);
			}
		}
		return receipt[0];
	} else {
		throw new Error('Expected at least one receipt in the result.');
	}
}
