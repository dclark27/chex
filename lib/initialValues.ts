import { FormShape } from '@/types/FormShape';

const initialValues: FormShape = {
	people: [
		{
			name: '',
		},
		{
			name: '',
		},
	],
	plates: [
		{
			name: '',
			price: '',
			eatenBy: [],
		},
	],
	price: '',
	tip: '',
};

export default initialValues;
