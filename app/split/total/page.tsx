import Link from 'next/link';
import { FieldArray } from '../../../components/FieldArray';
import { buttonVariants } from '../../../components/ui/button';

export default async function Page() {
	return (
		<>
			<FieldArray name='assignments' label='Assignments' />
			<div className='flex gap-10'>
				<Link
					className={buttonVariants({ variant: 'outline' })}
					href='/split/items'
				>
					Back
				</Link>
				<Link
					className={buttonVariants({ variant: 'default' })}
					href='/split/checks'
				>
					Finish
				</Link>
			</div>
		</>
	);
}
