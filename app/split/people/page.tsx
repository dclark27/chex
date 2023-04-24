import Link from 'next/link';
import { FieldArray } from '../../../components/FieldArray';
import { buttonVariants } from '../../../components/ui/button';

export default function Page() {
	return (
		<>
			<FieldArray name='people' label='People' />
			<div className='flex gap-10'>
				<Link className={buttonVariants({ variant: 'outline' })} href='/'>
					Back
				</Link>
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href='/split/items'
				>
					Next
				</Link>
			</div>
		</>
	);
}
