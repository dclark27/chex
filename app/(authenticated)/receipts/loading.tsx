import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export default function Loading() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Created Date</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell colSpan={3}>
						<Skeleton className='w-full h-[20px] rounded-full' />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={3}>
						<Skeleton className='w-full h-[20px] rounded-full' />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={3}>
						<Skeleton className='w-full h-[20px] rounded-full' />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={3}>
						<Skeleton className='w-full h-[20px] rounded-full' />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
