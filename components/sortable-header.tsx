'use client';
import { Column } from '@tanstack/react-table';
import { ChevronsUpDown, SortAsc, SortDesc } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
	align?: 'left' | 'center' | 'right';
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	align = 'center',
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	let alignClass = '';

	switch (align) {
		case 'left':
			alignClass = 'justify-start';
			break;
		case 'center':
			alignClass = 'justify-center';
			break;
		case 'right':
			alignClass = 'justify-end';
			break;
	}

	return (
		<div className={cn('flex space-x-2', className, alignClass)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='sm'
						className='-ml-3 h-8 data-[state=open]:bg-accent'
					>
						<span>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<SortDesc className='ml-2 h-4 w-4' />
						) : column.getIsSorted() === 'asc' ? (
							<SortAsc className='ml-2 h-4 w-4' />
						) : (
							<ChevronsUpDown className='ml-2 h-4 w-4' />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<SortAsc className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<SortDesc className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
