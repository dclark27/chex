'use client';

import { experimental_useOptimistic as useOptimistic } from 'react';
import Link from 'next/link';

import { Database } from '@/types/supabase';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	assignItemToDiner,
	unassignItem,
} from '@/app/dashboard/[receiptId]/action';

import { Icons } from './icons';

type Assignments = {
	diner_id: number | null;
	dish_id: number | null;
	receipt_id: string | null;
	id: number;
};

interface AssignmentsFormProps {
	receipt: Database['public']['Tables']['receipt']['Row'];
	items: Database['public']['Tables']['dish']['Row'][];
	diners: Database['public']['Tables']['diner']['Row'][];
	assignments: Assignments[];
}

export default function AssignmentsForm(props: AssignmentsFormProps) {
	const [optimisticAssignments, addOptimisticMessage] = useOptimistic<
		Assignments[]
	>(props.assignments);

	const handleOptimisticAssignments = async (
		dinerId: number,
		dishId: number,
		receiptId: string,
	): Promise<void> => {
		const newOptimisticAssignments = [...optimisticAssignments];
		newOptimisticAssignments.push({
			diner_id: dinerId,
			dish_id: dishId,
			receipt_id: receiptId,
			id: -1,
		});
		addOptimisticMessage(newOptimisticAssignments);
		await assignItemToDiner(dinerId, Number(dishId), props.receipt.id);
	};

	const handleOptimisticUnassign = async (
		dinerId: number,
		dishId: number,
	): Promise<void> => {
		const optimisticAssignmentsCopy = [...optimisticAssignments];
		const newOptimisticAssignments = optimisticAssignmentsCopy.filter(
			(assignment) => {
				return assignment.diner_id !== dinerId || assignment.dish_id !== dishId;
			},
		);
		addOptimisticMessage(newOptimisticAssignments);
		await unassignItem(dinerId, Number(dishId), props.receipt.id);
	};

	const ItemListSelect = ({ dinerId }: { dinerId: number }) => {
		return (
			<Select
				onValueChange={(item) => {
					handleOptimisticAssignments(dinerId, Number(item), props.receipt.id);
				}}
			>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Assign items' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Remaining Items</SelectLabel>
						{props.items.map((item, index) => (
							<SelectItem key={item.id + '-' + index} value={item.id + ''}>
								<div className='flex items-center justify-between'>
									{item.name}
									{optimisticAssignments.some(({ dish_id }) => {
										return dish_id === item.id;
									}) && <Icons.check className='h-4 w-4 opacity-50' />}
								</div>
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		);
	};

	return (
		<div className='flex flex-col gap-5'>
			<div className='flex flex-col space-y-2'>
				{props.diners.map((diner) => {
					return (
						<div className='flex flex-col' key={diner.id}>
							<h1 className='text-xl font-semibold'>{diner.name}</h1>
							{optimisticAssignments.map(({ diner_id, dish_id }) => {
								if (!diner_id || !dish_id) return null;
								if (diner.id === diner_id) {
									return (
										<div className='space-between flex flex-row items-center'>
											<span>
												{props.items.find((item) => item.id === dish_id)?.name}
											</span>
											<Button
												size='icon'
												variant='ghost'
												onClick={() => {
													handleOptimisticUnassign(diner_id, dish_id);
												}}
												aria-label='Delete assignment'
											>
												<Icons.close className='h-4 w-4 opacity-50' />
											</Button>
										</div>
									);
								}
							})}
							<ItemListSelect dinerId={diner.id} />
						</div>
					);
				})}
			</div>
			<div className='flex flex-row justify-between'>
				<Link
					href={`/dashboard/${props.receipt.id}/diners`}
					className={buttonVariants({ variant: 'outline' })}
				>
					Edit Diners
				</Link>
				<Link
					href={`/dashboard/${props.receipt.id}/receipts`}
					className={buttonVariants({ variant: 'default' })}
				>
					Generate Receipts
				</Link>
			</div>
		</div>
	);
}
