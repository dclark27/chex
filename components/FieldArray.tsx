'use client';
import { Plus, Trash } from 'lucide-react';
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
			<div className='flex w-full gap-5 flex-col'>
				{fields.map((field, index) => (
					<div className='flex w-full gap-5' key={index}>
						<Input
							type='text'
							placeholder={label}
							key={field.id}
							{...register(`${name}.${index}.value`)}
						/>
						<Button
							variant='default'
							className='flex gap-2'
							onClick={() => remove(index)}
						>
							<Trash size={16} />
							Remove
						</Button>
					</div>
				))}
				<Button
					variant='outline'
					className='flex gap-2'
					onClick={() => append({ value: '' })}
				>
					<Plus size={16} />
					{'Add'}
				</Button>
			</div>
		</>
	);
}
