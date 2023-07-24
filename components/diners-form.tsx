'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { deleteDiner, updateReceipt } from '@/app/dashboard/[receiptId]/action';

import { Icons } from './icons';

const assignmentsSchema = z.object({
	diners: z.array(
		z.object({
			name: z.string().min(1, 'Required'),
			id: z.number(),
		}),
	),
});
interface AssignmentsFormProps {
	receipt: Database['public']['Tables']['receipt']['Row'];
	items: Database['public']['Tables']['dish']['Row'][];
	diners: {
		name: string | null;
		id: number;
	}[];
}

type FormShape = z.infer<typeof assignmentsSchema>;

export default function DinersForm(props: AssignmentsFormProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const form = useForm<FormShape>({
		defaultValues: {
			diners:
				props.diners.length === 0
					? [
							{
								name: '',
								id: -1,
							},
							{
								name: '',
								id: -1,
							},
					  ]
					: props.diners.map((diner) => ({
							name: diner.name ?? '',
							id: diner.id,
					  })),
		},
	});

	const handleSubmit: SubmitHandler<FormShape> = async (data) => {
		startTransition(async () => {
			await updateReceipt(props.receipt, props.items, data.diners);
			router.push(`/dashboard/${props.receipt.id}/assignments`);
		});
	};
	const handleError: SubmitErrorHandler<FormShape> = async (data) => {
		console.error(data);
	};

	const { fields, append, remove } = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'diners', // unique name for your Field Array
	});

	const diners = form.watch('diners');

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
								name={`diners.${index}.name`}
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Friend</FormLabel>
										<FormControl>
											<Input
												placeholder='Name'
												disabled={isPending}
												{...field}
											/>
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
										const item = diners[index];
										await deleteDiner(item.id, props.receipt.id);
									}
								}}
							>
								<Icons.trash className='h-4 w-4' />
							</Button>
						</div>
					))}
					<Button
						variant='outline'
						type='button'
						onClick={() =>
							append({
								name: '',
								id: -1,
							})
						}
					>
						Add Friend
						<Icons.plus className='ml-2 h-4 w-4' />
					</Button>
				</div>
				<div className='flex flex-row justify-between'>
					<Link
						href={`/dashboard/${props.receipt.id}/items`}
						className={buttonVariants({ variant: 'outline' })}
					>
						Edit Items
					</Link>
					<Button type='submit'>
						{isPending && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)}
						Save and Continue
					</Button>
				</div>
			</form>
		</Form>
	);
}
