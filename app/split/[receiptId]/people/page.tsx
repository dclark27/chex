import { FieldArray } from '@/components/FieldArray';
import FooterNav from '@/components/FooterNav';

export default function Page({ params }) {
	console.log(params);
	return (
		<>
			<FieldArray name='name' label='Name' />
			<FooterNav next={`/split/${params.receiptId}}items`} back='/' />
		</>
	);
}
