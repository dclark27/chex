'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Database } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import { deleteReceipt } from '@/app/dashboard/action';

export default function ReceiptActions({
	receipt,
}: {
	receipt: Database['public']['Tables']['receipt']['Row'];
}) {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	return (
		<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>{'Open menu'}</span>
						<Icons.more className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Receipt Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem asChild>
							<Link href={`/dashboard/${receipt.id}/items`}>
								<Icons.pizza className='mr-2 h-4 w-4' />
								{'Edit Items'}
							</Link>
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger asChild>
						<DropdownMenuItem asChild>
							<Link href={`/dashboard/${receipt.id}/diners`}>
								<Icons.user className='mr-2 h-4 w-4' />
								{'Edit Diners'}
							</Link>
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger asChild>
						<DropdownMenuItem asChild>
							<Link href={`/dashboard/${receipt.id}/receipts`}>
								<Icons.fileStack className='mr-2 h-4 w-4' />
								{'View Receipts'}
							</Link>
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger asChild>
						<DropdownMenuItem
							onClick={async () => await deleteReceipt(receipt.id)}
						>
							<Icons.trash className='mr-2 h-4 w-4' />
							{'Delete Receipt'}
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
		</Dialog>
	);
}
