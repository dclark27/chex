'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Receipt } from '@prisma/client';
import currency from 'currency.js';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './ui/button';

interface CreateNewReceiptProps {
	createReceipt(request: {
		tax: number;
		tip: number;
		subtotal: number;
		notes: string;
		total: number;
		paymentMethod:
			| 'Visa'
			| 'Cash'
			| 'Mastercard'
			| 'American Express'
			| 'Discover'
			| 'Other';
	}): Promise<Receipt>;
}

import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
	tax: z.string(),
	tip: z.string(),
	subtotal: z.string(),
	notes: z.string(),
	total: z.number().min(0),
	paymentMethod: z.enum([
		'Visa',
		'Cash',
		'Mastercard',
		'American Express',
		'Discover',
		'Other',
	]),
});

const CreateNewReceipt = (props: CreateNewReceiptProps) => {
	const router = useRouter();
	const { createReceipt } = props;
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			subtotal: '0.00',
			tax: '0.00',
			tip: '0.00',
			notes: '',
			total: 0,
			paymentMethod: 'Visa',
		},
	});

	const { watch } = form;

	const subtotal = watch('subtotal');
	const tax = watch('tax');
	const tip = watch('tip');
	const total = currency(subtotal).add(tax).add(tip);

	const handleCreateReceipt: SubmitHandler<z.infer<typeof formSchema>> = async (
		data,
	) => {
		startTransition(async () => {
			const receipt = await createReceipt({
				subtotal: parseFloat(data.subtotal.replace(/[^0-9]/, '')),
				tax: parseFloat(data.tax.replace(/[^0-9]/, '')),
				tip: parseFloat(data.tip.replace(/[^0-9]/, '')),
				notes: data.notes,
				total: parseFloat(total.toString()),
				paymentMethod: data.paymentMethod,
			});
			router.push(`/split/${receipt.id}/people`);
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='default'>Create New Receipt</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Create New Receipt</DialogTitle>
					<DialogDescription>
						Enter the details of your receipt below to get started.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateReceipt)}
						className='space-y-2'
					>
						<FormField
							control={form.control}
							name='subtotal'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subtotal</FormLabel>
									<FormControl>
										<Input disabled={isPending} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='tax'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tax</FormLabel>
									<FormControl>
										<Input disabled={isPending} {...field} />
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
										<Input disabled={isPending} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<DialogFooter>
							<Button type='submit' disabled={isPending}>
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateNewReceipt;
