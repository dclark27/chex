import { cn } from '@/lib/utils';
import * as React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const defaultMaskOptions = {
	prefix: '$',
	suffix: '',
	includeThousandsSeparator: true,
	thousandsSeparatorSymbol: ',',
	allowDecimal: true,
	decimalSymbol: '.',
	decimalLimit: 2, // how many digits allowed after the decimal
	integerLimit: 7, // limit length of integer numbers
	allowNegative: false,
	allowLeadingZeroes: false,
};

export interface CurrencyInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const CurrencyInput = React.forwardRef<MaskedInput, CurrencyInputProps>(
	({ className, type, ...props }, ref) => {
		const currencyMask = createNumberMask({
			...defaultMaskOptions,
		});
		return (
			<MaskedInput
				mask={currencyMask}
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				{...props}
				ref={ref}
			/>
		);
	},
);
CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
