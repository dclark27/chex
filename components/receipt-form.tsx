'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import currency from 'currency.js';
import {
	SubmitErrorHandler,
	SubmitHandler,
	useFieldArray,
	useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { Database } from '@/types/supabase';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { deleteItem, updateReceipt } from '@/app/dashboard/[receiptId]/action';

import { Icons } from './icons';

const itemsSchema = z.array(
	z.object({
		id: z.number(),
		quantity: z.string().min(1, 'Required'),
		name: z.string().min(1, 'Required'),
		price: z
			.string()
			.min(1, 'Required')
			.transform((val, ctx) => {
				const parsed = currency(val);
				if (isNaN(parsed.value)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Must be a number',
					});
					return z.NEVER;
				}
				return parsed.format();
			}),
	}),
);

const formSchema = z.object({
	tax: z
		.string()
		.min(1, 'Required')
		.transform((val, ctx) => {
			const parsed = currency(val);
			if (isNaN(parsed.value)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Must be a number',
				});
				return z.NEVER;
			}
			return parsed.format();
		}),
	tip: z
		.string()
		.min(1, 'Required')
		.transform((val, ctx) => {
			const parsed = currency(val);
			if (isNaN(parsed.value)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Must be a number',
				});
				return z.NEVER;
			}
			return parsed.format();
		}),
	subtotal: z
		.string()
		.min(1, 'Required')
		.transform((val, ctx) => {
			const parsed = currency(val);
			if (isNaN(parsed.value)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Must be a number',
				});
				return z.NEVER;
			}
			return parsed.format();
		}),
	notes: z.string(),
	total: z
		.string()
		.min(1, 'Required')
		.transform((val, ctx) => {
			const parsed = currency(val);
			if (isNaN(parsed.value)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Must be a number',
				});
				return z.NEVER;
			}
			return parsed.format();
		}),
	paymentMethod: z.string(),
	items: itemsSchema,
});

interface ReceiptItem {
	quantity: number | null;
	name: string | null;
	price: number | null;
	id: number | null;
}

interface ReceiptFormProps {
	receipt: Database['public']['Tables']['receipt']['Row'];
	items: ReceiptItem[];
	diners: Database['public']['Tables']['diner']['Row'][];
}

const calculateSubtotal = (items: z.infer<typeof itemsSchema>) => {
	return items.reduce((a, c) => {
		if (c && c.price && c.quantity) {
			const price = currency(c.price).value;
			return price + a;
		} else {
			return a + 0;
		}
	}, 0);
};

export default function ReceiptForm(props: ReceiptFormProps) {
	const { receipt, items, diners } = props;
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: items
				? items.map((item) => ({
						quantity: item.quantity + '',
						name: item.name || '',
						price: currency(item.price || 0).format(),
						id: item.id || -1,
				  }))
				: [
						{
							quantity: '',
							name: '',
							price: currency(0).format(),
						},
				  ],
			subtotal: currency(receipt.subtotal || 0).format(),
			tax: currency(receipt.tax || 0).format(),
			tip: currency(receipt.tip || 0).format(),
			notes: receipt.notes || '',
			total: currency(receipt.total || 0).format(),
			paymentMethod: receipt.paymentMethod || '',
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'items', // unique name for your Field Array
	});

	const { watch } = form;
	const formItems = watch('items');
	const tax = watch('tax');
	const tip = watch('tip');
	const subtotal = currency(calculateSubtotal(formItems)).format();
	const total = currency(subtotal).add(tax).add(tip);

	const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
		data,
	) => {
		startTransition(async () => {
			try {
				await updateReceipt(
					{
						tax: currency(data.tax).value,
						tip: currency(data.tip).value,
						subtotal: calculateSubtotal(data.items),
						total: currency(subtotal).add(tax).add(tip).value,
						id: receipt.id,
					},
					data.items.map((item) => ({
						price: currency(item.price).value,
						quantity: parseInt(item.quantity),
						name: item.name,
						id: item.id,
					})),
					diners,
				);
				router.push(`/dashboard/${receipt.id}/diners`);
			} catch (error) {
				console.error(data);
			}
		});
	};

	const handleError: SubmitErrorHandler<z.infer<typeof formSchema>> = (
		data,
	) => {
		console.error(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit, handleError)}
				className='space-y-2'
			>
				<div className='flex flex-col gap-2'>
					{fields.map((field, index) => (
						<div className='flex flex-row items-end gap-2' key={field.id}>
							<FormField
								control={form.control}
								name={`items.${index}.quantity`}
								render={({ field }) => (
									<FormItem className='w-14'>
										<FormLabel>#</FormLabel>
										<FormControl>
											<Input type='number' disabled={isPending} {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${index}.price`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												disabled={isPending}
												{...field}
												onBlur={(e) => {
													const formattedValue = currency(
														e.target.value,
													).format();
													form.setValue(field.name, formattedValue);
													field.onBlur();
												}}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`items.${index}.name`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input disabled={isPending} {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								variant='outline'
								size='icon'
								type='button'
								onClick={async () => {
									remove(index);
									if (field.id !== -1) {
										const item = formItems[index];
										await deleteItem(item.id, receipt.id);
									}
								}}
							>
								<Icons.trash className='h-4 w-4' />
							</Button>
						</div>
					))}
					<Button
						variant='outline'
						onClick={() =>
							append({
								quantity: '1',
								name: '',
								price: currency(0).format(),
								id: -1,
							})
						}
					>
						Add Item
						<Icons.plus className='ml-2 h-4 w-4' />
					</Button>
				</div>

				<FormItem>
					<FormLabel>Subtotal</FormLabel>
					<FormControl>
						<Input disabled value={subtotal} />
					</FormControl>
					<FormMessage />
				</FormItem>
				<FormField
					control={form.control}
					name='tax'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tax</FormLabel>
							<FormControl>
								<Input
									disabled={isPending}
									{...field}
									onBlur={(e) => {
										const formattedValue = currency(e.target.value).format();
										form.setValue(field.name, formattedValue);
										field.onBlur();
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='tip'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tip</FormLabel>
							<FormControl>
								<Input
									disabled={isPending}
									{...field}
									onBlur={(e) => {
										const formattedValue = currency(e.target.value).format();
										form.setValue(field.name, formattedValue);
										field.onBlur();
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormItem>
					<FormLabel>Total</FormLabel>
					<FormControl>
						<Input disabled value={total.format()} name='total' />
					</FormControl>
					<FormMessage />
				</FormItem>
				<FormField
					control={form.control}
					name='paymentMethod'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payment Method</FormLabel>
							<Select
								disabled={isPending}
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Payment Method' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='Visa'>Visa</SelectItem>
									<SelectItem value='Cash'>Cash</SelectItem>
									<SelectItem value='Mastercard'>Mastercard</SelectItem>
									<SelectItem value='American Express'>
										American Express
									</SelectItem>
									<SelectItem value='Discover'>Discover</SelectItem>
									<SelectItem value='Other'>Other</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='notes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea disabled={isPending} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-row justify-between'>
					<Link
						href={`/dashboard`}
						className={buttonVariants({ variant: 'outline' })}
					>
						Back to Receipts
					</Link>
					<Button type='submit' disabled={isPending}>
						Save & Continue
					</Button>
				</div>
			</form>
		</Form>
	);
}
