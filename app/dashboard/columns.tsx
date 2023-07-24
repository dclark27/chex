'use client';

import { createColumnHelper } from '@tanstack/react-table';
import currency from 'currency.js';

import { Receipt } from '@/types/validation/receipt';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import ReceiptActions from '@/components/receipt-actions';

const columnHelper = createColumnHelper<Receipt>();

export const columns: any[] = [
	columnHelper.accessor('created_at', {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={'Date'} />
		),
		cell: ({ row }) => {
			if (!row.original.created_at) {
				return null;
			}
			return new Date(row.original.created_at).toLocaleString();
		},
	}),
	columnHelper.accessor('paymentMethod', {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={'Payment Method'} />
		),
	}),
	columnHelper.accessor('notes', {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={'Notes'} />
		),
	}),
	columnHelper.accessor('subtotal', {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={'Subtotal'} />
		),
		cell: ({ row }) => {
			if (!row.original.subtotal) {
				return null;
			}
			return currency(row.original.subtotal).format();
		},
	}),
	columnHelper.accessor('tax', {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={'Tax'} />
		),
		cell: ({ row }) => {
			if (!row.original.tax) {
				return null;
			}
			return currency(row.original.tax).format();
		},
	}),
	columnHelper.accessor('tip', {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={'Tip'} />
		),
		cell: ({ row }) => {
			if (!row.original.tip) {
				return null;
			}
			return currency(row.original.tip).format();
		},
	}),
	columnHelper.accessor('total', {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={'Total'} />
		),
		cell: ({ row }) => {
			if (!row.original.total) {
				return null;
			}
			return currency(row.original.total).format();
		},
	}),
	columnHelper.display({
		id: 'actions',
		cell: ({ row }) => {
			const receipt = row.original;

			return <ReceiptActions receipt={receipt} />;
		},
	}),
];
