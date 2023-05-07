import { FieldArray } from '@/components/FieldArray';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Page({ params }: { params: { receiptId: string } }) {
	return (
		<>
			<FieldArray name='items' label='Items' />
			<div className='flex justify-between w-full'>
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href={`/split/${encodeURIComponent(params.receiptId)}/total`}
				>
					Back
				</Link>
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href={`/split/${encodeURIComponent(params.receiptId)}/people`}
				>
					Next
				</Link>
			</div>
		</>
	);
}
