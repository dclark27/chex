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
import { Label } from '@/components/ui/label';
import { Receipt } from '@prisma/client';
import currency from 'currency.js';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { CurrencyInput } from './ui/currency-input';

interface CreateNewReceiptProps {
	createReceipt(request: {
		tax: number;
		tip: number;
		subtotal: number;
		total: number;
	}): Promise<Receipt>;
}

interface FormShape {
	subtotal: string;
	tax: string;
	tip: string;
	notes: string;
}

const CreateNewReceipt = (props: CreateNewReceiptProps) => {
	const router = useRouter();
	const { createReceipt } = props;
	const [isPending, startTransition] = useTransition();
	const { handleSubmit, register, watch, control } = useForm<FormShape>({
		defaultValues: {
			subtotal: '0.00',
			tax: '0.00',
			tip: '0.00',
			notes: '',
		},
	});

	const subtotal = watch('subtotal');
	const tax = watch('tax');
	const tip = watch('tip');
	const total = currency(subtotal).add(tax).add(tip);

	const handleCreateReceipt: SubmitHandler<FormShape> = async (data) => {
		startTransition(async () => {
			const receipt = await createReceipt({
				subtotal: parseFloat(data.subtotal),
				tax: parseFloat(data.tax),
				tip: parseFloat(data.tip),
				total: parseFloat(total.toString()),
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
				<form
					className='grid gap-4 py-4'
					onSubmit={handleSubmit(handleCreateReceipt)}
				>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='subtotal' className='text-right'>
							Subtotal
						</Label>
						<Controller
							name='subtotal'
							control={control}
							render={({ field }) => (
								<CurrencyInput
									required
									disabled={isPending}
									min={1}
									step='any'
									className='col-span-3'
									{...field}
								/>
							)}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='tax' className='text-right'>
							Tax
						</Label>
						<Controller
							name='tax'
							control={control}
							render={({ field }) => (
								<CurrencyInput
									className='col-span-3'
									disabled={isPending}
									{...field}
								/>
							)}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='tip' className='text-right'>
							Tip
						</Label>
						<Controller
							name='tip'
							control={control}
							render={({ field }) => (
								<CurrencyInput
									className='col-span-3'
									disabled={isPending}
									{...field}
								/>
							)}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='notes' className='text-right'>
							Notes
						</Label>
						<Input
							className='col-span-3'
							disabled={isPending}
							{...register('notes')}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Total
						</Label>
						<Input
							id='name'
							disabled
							className='col-span-3'
							value={currency(total).format()}
						/>
					</div>
					<DialogFooter>
						<Button type='submit' disabled={isPending}>
							Create
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateNewReceipt;
