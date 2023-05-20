'use client';
import { Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
	name: string;
	label: string;
	receiptId: string;
	nextRoute: string;
	prevRoute: string;
	defaultValues: FormShape;
	deleteItem(data: { id: number }): Promise<void>;
	save(data: FormShape): Promise<void>;
}

export type FormShape = {
	[key: string]: { value: string; locator?: number }[];
};

export function FieldArray(props: Props) {
	const router = useRouter();
	const { name, label, receiptId, save, deleteItem, nextRoute, defaultValues } =
		props;
	const [isPending, startTransition] = useTransition();
	const { control, register, handleSubmit } = useForm<FormShape>({
		defaultValues,
	});
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name, // unique name for your Field Array
	});

	const onSubmit: SubmitHandler<FormShape> = async (data) => {
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
				{label}
			</h2>
			<div className='flex w-full gap-5 flex-col'>
				{fields.map((field, index) => (
					<div className='flex w-full gap-5' key={index}>
						<Input
							type='text'
							disabled={isPending}
							placeholder={label}
							key={field.id}
							{...register(`${name}.${index}.value`)}
						/>
						<Button
							variant='default'
							className='flex gap-2'
							type='button'
							disabled={isPending}
							onClick={() => handleDeleteItem(index, field.locator)}
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
					onClick={() => append({ value: '' })}
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
