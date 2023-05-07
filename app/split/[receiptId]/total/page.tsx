import { FieldArray } from '@/components/FieldArray';
import FooterNav from '@/components/FooterNav';

export default async function Page({ params }) {
	return (
		<>
			<FieldArray name='assignments' label='Assignments' />
			<FooterNav
				next={`/split/${params.id}/checks`}
				back={`/split/${params.id}/items`}
			/>
		</>
	);
}
