'use client';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
	name: string;
	label: string;
}

export function FieldArray(props: Props) {
	const { name, label } = props;

	const { control, register } = useForm({
		defaultValues: {
			[name]: [{ value: '' }, { value: '' }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name, // unique name for your Field Array
	});

	return (
		<>
			<h2 className='scroll-m-20 text-xl font-semibold tracking-tight'>
				{label}
			</h2>
			{fields.map((field, index) => (
				<div className='flex gap-5' key={index}>
					<Input
						type='text'
						placeholder={label}
						key={field.id}
						{...register(`${name}.${index}.value`)}
					/>
					<Button variant='outline' onClick={() => remove(index)}>
						Remove
					</Button>
				</div>
			))}
			<Button onClick={() => append({ value: '' })}>Add</Button>
		</>
	);
}
