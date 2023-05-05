import { FieldArray } from '@/components/FieldArray';
import FooterNav from '@/components/FooterNav';

export default async function Page() {
	return (
		<>
			<FieldArray name='assignments' label='Assignments' />
			<FooterNav next='/split/checks' back='/split/items' />
		</>
	);
}
