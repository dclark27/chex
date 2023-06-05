'use client';
import { Listbox, Transition } from '@headlessui/react';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { Diner } from '@prisma/client';
import currency from 'currency.js';
import { Check, ChevronDown, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useTransition } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { CurrencyInput } from './ui/currency-input';
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
	items: z.array(
		z.object({
			name: z.string().nonempty({ message: 'Required' }),
			price: z.string().nonempty({ message: 'Required' }),
			dinerId: z.number().array().min(1, 'Required'),
			locator: z.number().optional(),
		}),
	),
});

export type FormShape = z.infer<typeof formSchema>;

interface Props {
	receiptId: string;
	nextRoute: string;
	prevRoute: string;
	diners: Diner[];
	defaultValues: FormShape;
	subtotal: number;
	deleteItem(data: { id: number }): Promise<void>;
	save(data: FormShape): Promise<void>;
}

export function ItemsFieldArray(props: Props) {
	const router = useRouter();
	const { receiptId, save, deleteItem, nextRoute, defaultValues } = props;
	const [isPending, startTransition] = useTransition();
	const form = useForm<FormShape>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});
	const { control, watch, setError, clearErrors } = form;
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'items', // unique name for your Field Array
	});

	const subtotalFromFields: number = watch('items', defaultValues.items).reduce(
		(acc, item) => acc + currency(item.price).value,
		0,
	);

	const onSubmit: SubmitHandler<FormShape> = async (data) => {
		if (remainingSubtotal !== 0) {
			setError('items', {
				type: 'manual',
				message: 'Receipt total and items do not match.',
			});
			return;
		}
		if (data.items.length === 0) {
			form.setError('items', {
				type: 'manual',
				message: 'At least one item is required',
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
		router.refresh();
		router.back();
	};

	const remainingSubtotal = currency(props.subtotal - subtotalFromFields).value;

	useEffect(() => {
		if (remainingSubtotal === 0) {
			clearErrors();
		}
	}, [clearErrors, remainingSubtotal]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-5 mb-10'
			>
				<h2 className='scroll-m-20 text-xl font-semibold tracking-tight'>
					Items
				</h2>
				<div className='flex flex-wrap gap-5'>
					{fields.map((field, index) => (
						<Card className='w-96' key={field.id}>
							<CardContent className='flex gap-5 flex-col py-4'>
								<FormField
									control={form.control}
									name={`items.${index}.name`}
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
								<FormField
									control={form.control}
									name={`items.${index}.price`}
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<CurrencyInput
													placeholder='Price'
													disabled={isPending}
													min={1}
													step='any'
													className='col-span-3'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`items.${index}.dinerId`}
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>Assignment</FormLabel>
											<Listbox
												value={field.value}
												onChange={(e) => {
													field.onChange(e);
												}}
												multiple
											>
												<div className='relative mt-1'>
													<Listbox.Button className='flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
														<span className='block truncate'>
															{field.value
																.map((dinerId) => {
																	const diner = props.diners.find(
																		(diner) => diner.id === dinerId,
																	);
																	return diner?.name;
																})
																.join(', ')}
														</span>
														<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
															<ChevronDown
																className='h-5 w-5 text-gray-400'
																aria-hidden='true'
															/>
														</span>
													</Listbox.Button>
													<Transition
														as={Fragment}
														leave='transition ease-in duration-100'
														leaveFrom='opacity-100'
														leaveTo='opacity-0'
													>
														<Listbox.Options className='z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
															{props.diners.map((person, personIdx) => (
																<Listbox.Option
																	key={personIdx}
																	className='relative cursor-default select-none py-2 pl-10 pr-4'
																	value={person.id}
																>
																	{({ selected }) => (
																		<>
																			<span
																				className={`block truncate ${
																					selected
																						? 'font-medium'
																						: 'font-normal'
																				}`}
																			>
																				{person.name}
																			</span>
																			{selected ? (
																				<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
																					<Check
																						className='h-5 w-5'
																						aria-hidden='true'
																					/>
																				</span>
																			) : null}
																		</>
																	)}
																</Listbox.Option>
															))}
														</Listbox.Options>
													</Transition>
												</div>
											</Listbox>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<CardFooter>
								<Button
									variant='outline'
									type='button'
									className='w-full'
									disabled={isPending}
									onClick={() => {
										handleDeleteItem(index, field.locator);
									}}
								>
									<Trash size={16} className='mr-2 h-4 w-4' />
									Delete
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
				<FormField
					control={form.control}
					name='items'
					render={() => (
						<FormItem className='flex-1'>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-col justify-between align-middle w-full gap-5'>
					<Button
						variant='outline'
						className='flex gap-2'
						type='button'
						disabled={isPending}
						onClick={() => append({ name: '', price: '', dinerId: [] })}
					>
						<Plus size={16} />
						Add
					</Button>
					<Badge
						className='p-1 flex align-middle justify-center w-full'
						variant={
							remainingSubtotal < 0
								? 'destructive'
								: remainingSubtotal === 0
								? 'success'
								: 'default'
						}
					>
						{remainingSubtotal === 0 && <Check />}
						{remainingSubtotal === 0 && 'Receipt total and items match!'}
						{remainingSubtotal > 0 && 'Remaining Balance: '}
						{remainingSubtotal < 0 && 'Over: '}
						{remainingSubtotal !== 0 &&
							currency(props.subtotal - subtotalFromFields).format()}
					</Badge>
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
						Finish
					</Button>
				</div>
			</form>
			<DevTool control={control} />
		</Form>
	);
}
