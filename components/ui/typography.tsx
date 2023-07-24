'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
	variants: {
		variant: {
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
			h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
			h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
			h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
			h6: 'scroll-m-20 text-base font-semibold tracking-tight',
			caption: 'text-sm font-medium leading-none',
			lead: 'text-xl text-muted-foreground',
			muted: 'text-sm text-muted-foreground',
			body1: 'text-base',
			body2: 'text-sm',
			blockquote: 'border-l-2 pl-6 italic',
			inlineCode:
				'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
		},
	},
	defaultVariants: {
		variant: 'body1',
	},
});

export interface TypographyProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof typographyVariants> {
	asChild?: boolean;
}

const Typography = React.forwardRef<HTMLSpanElement, TypographyProps>(
	({ className, variant, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'span';
		return (
			<Comp
				className={cn(typographyVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Typography.displayName = 'Typography';

export { Typography };
