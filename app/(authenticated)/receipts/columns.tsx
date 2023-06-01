'use client';
import { DataTableColumnHeader } from '@/components/sortable-header';
import { Receipt } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import currency from 'currency.js';

export const columns: ColumnDef<Receipt>[] = [
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Date' />
		),
		cell: ({ row }) => {
			const date = new Date(row.getValue('date'));
			const formatted = date.toLocaleDateString();
			return formatted;
		},
	},
	{
		accessorKey: 'paymentMethod',
		header: 'Payment Method',
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
	},
	{
		accessorKey: 'subtotal',
		header: () => <div className='text-right'>Subtotal</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('subtotal'));
			const formatted = currency(amount).format();
			return <div className='text-right'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'tax',
		header: () => <div className='text-right'>Tax</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('tax'));
			const formatted = currency(amount).format();
			return <div className='text-right'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'tip',
		header: () => <div className='text-right'>Tip</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('tip'));
			const formatted = currency(amount).format();
			return <div className='text-right'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'total',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Total' align='right' />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('total'));
			const formatted = currency(amount).format();
			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'actions',
		header: () => <div className='text-right'>Actions</div>,
	},
];
