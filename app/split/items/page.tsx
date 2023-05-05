import { FieldArray } from '@/components/FieldArray';
import FooterNav from '@/components/FooterNav';

export default async function Page() {
	return (
		<>
			<FieldArray name='items' label='Items' />
			<FooterNav next='/split/total' back='/split/people' />
		</>
	);
}
