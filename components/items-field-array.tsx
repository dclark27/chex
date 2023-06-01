'use client';
import { Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import {
	Controller,
	SubmitHandler,
	useFieldArray,
	useForm,
} from 'react-hook-form';
import { Button } from './ui/button';
import { CurrencyInput } from './ui/currency-input';
import { Input } from './ui/input';

interface Props {
	receiptId: string;
	nextRoute: string;
	prevRoute: string;
	defaultValues: ItemsFieldArrayFormShape;
	deleteItem(data: { id: number }): Promise<void>;
	save(data: ItemsFieldArrayFormShape): Promise<void>;
}

export type ItemsFieldArrayFormShape = {
	items: { name: string; price: string; locator?: number }[];
};

export function ItemsFieldArray(props: Props) {
	const router = useRouter();
	const { receiptId, save, deleteItem, nextRoute, defaultValues } = props;
	const [isPending, startTransition] = useTransition();
	const { control, register, handleSubmit } = useForm<ItemsFieldArrayFormShape>(
		{
			defaultValues,
		},
	);
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'items', // unique name for your Field Array
	});

	const onSubmit: SubmitHandler<ItemsFieldArrayFormShape> = async (data) => {
		router.push(`/split/${encodeURIComponent(receiptId)}/${nextRoute}` as any);
		startTransition(async () => {
			await save(data);
		});
	};

	const handleDeleteItem = async (index: number, locator?: number) => {
		remove(index);
		locator && (await deleteItem({ id: locator }));
	};

	const handleBack = () => {
		router.back();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
			<h2 className='scroll-m-20 text-xl font-semibold tracking-tight'>
				Items
			</h2>
			<div className='flex w-full gap-5 flex-col'>
				{fields.map((field, index) => (
					<div className='flex w-full gap-5' key={field.id}>
						<Input
							type='text'
							disabled={isPending}
							placeholder='Item'
							{...register(`items.${index}.name`)}
						/>
						<Controller
							name={`items.${index}.price`}
							control={control}
							render={({ field }) => (
								<CurrencyInput
									required
									placeholder='Price'
									disabled={isPending}
									min={1}
									step='any'
									className='col-span-3'
									{...field}
								/>
							)}
						/>
						<Button
							variant='default'
							className='flex gap-2'
							type='button'
							disabled={isPending}
							onClick={() => {
								handleDeleteItem(index, field.locator);
							}}
						>
							<Trash size={16} />
							Remove
						</Button>
					</div>
				))}
				<Button
					variant='outline'
					className='flex gap-2'
					type='button'
					disabled={isPending}
					onClick={() => append({ name: '', price: '' })}
				>
					<Plus size={16} />
					{'Add'}
				</Button>
			</div>
			<div className='flex justify-between w-full'>
				<Button
					onClick={handleBack}
					variant='outline'
					type='button'
					disabled={isPending}
				>
					Back
				</Button>
				<Button variant='outline' type='submit' disabled={isPending}>
					Next
				</Button>
			</div>
		</form>
	);
}
