'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
	name: z.array(
		z.object({
			value: z.string().nonempty({ message: 'Required' }),
			locator: z.number().optional(),
		}),
	),
});

export type FormShape = z.infer<typeof formSchema>;

interface Props {
	receiptId: string;
	nextRoute: string;
	prevRoute: string;
	defaultValues: FormShape;
	deleteItem(data: { id: number }): Promise<void>;
	save(data: FormShape): Promise<void>;
}

export function PeopleFieldArray(props: Props) {
	const router = useRouter();
	const { receiptId, save, deleteItem, nextRoute, defaultValues } = props;
	const [isPending, startTransition] = useTransition();
	const form = useForm<FormShape>({
		defaultValues,
		resolver: zodResolver(formSchema),
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'name', // unique name for your Field Array
	});

	const onSubmit: SubmitHandler<FormShape> = async (data) => {
		if (data.name.length === 0) {
			form.setError('name', {
				type: 'manual',
				message: 'At least one person is required',
			});
			return;
		}
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
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-5'
			>
				<h2 className='scroll-m-20 text-xl font-semibold tracking-tight'>
					Name
				</h2>
				<div className='flex w-full gap-5 flex-col'>
					{fields.map((field, index) => (
						<div className='flex w-full gap-5 items-end' key={field.id}>
							<FormField
								control={form.control}
								name={`name.${index}.value`}
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder='Name'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								variant='default'
								className='flex gap-2'
								type='button'
								disabled={isPending}
								onClick={() => handleDeleteItem(index, field.locator)}
							>
								<Trash size={16} />
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
						Add
					</Button>
				</div>
				<FormField
					control={form.control}
					name='name'
					render={() => (
						<FormItem className='flex-1'>
							<FormMessage />
						</FormItem>
					)}
				/>
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
		</Form>
	);
}
