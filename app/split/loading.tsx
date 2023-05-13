import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='flex flex-col gap-5'>
			<Skeleton className='w-full h-[20px] rounded-full' />
			<Skeleton className='w-full h-[20px] rounded-full' />
			<Skeleton className='w-full h-[20px] rounded-full' />
			<Skeleton className='w-full h-[20px] rounded-full' />
			<Skeleton className='w-full h-[20px] rounded-full' />
		</div>
	);
}
