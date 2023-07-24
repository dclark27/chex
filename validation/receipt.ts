import { z } from 'zod';

const receiptSchema = z.object({
	created_at: z.string().nullable(),
	id: z.string(),
	notes: z.string().nullable(),
	paymentMethod: z.string().nullable(),
	receiptDate: z.string().nullable(),
	subtotal: z.number().nullable(),
	tax: z.number().nullable(),
	tip: z.number().nullable(),
	total: z.number().nullable(),
	user_id: z.string().nullable(),
	receiptImageUrl: z.string(),
});

export const receiptsSchema = z.array(receiptSchema).min(0);

export type Receipt = z.infer<typeof receiptSchema>;
export type Receipts = z.infer<typeof receiptsSchema>;
