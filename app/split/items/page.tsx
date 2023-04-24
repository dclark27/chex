import Link from 'next/link';
import { FieldArray } from '../../../components/FieldArray';
import { buttonVariants } from '../../../components/ui/button';

export default async function Page() {
	return (
		<>
			<FieldArray name='items' label='Items' />
			<div className='flex gap-10'>
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href='/split/people'
				>
					Back
				</Link>
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href='/split/total'
				>
					Next
				</Link>
			</div>
		</>
	);
}
