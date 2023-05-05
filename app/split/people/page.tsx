import { FieldArray } from '@/components/FieldArray';
import FooterNav from '@/components/FooterNav';

export default function Page() {
	return (
		<>
			<FieldArray name='name' label='Name' />
			<FooterNav next='/split/items' back='/' />
		</>
	);
}
