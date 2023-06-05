import { Diner, Prisma, Receipt, ReceiptItem } from '@prisma/client';
import currency from 'currency.js';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { CardContent, CardFooter, CardHeader } from './ui/card';

interface Props {
	receipt: Receipt;
	diner: Diner;
	items: ReceiptItem[];
}

const LineItem = (props: { name: string; price: number; bold?: boolean }) => {
	const { name, price, bold } = props;
	return (
		<div className='flex flex-row justify-between'>
			<small className='text-sm font-medium leading-none'>{name}</small>
			<p className={cn('text-sm', bold ? 'font-bold' : 'font-light')}>
				{currency(price).format()}
			</p>
		</div>
	);
};

export const IndividualReceipt = (props: Props) => {
	const { receipt, diner, items } = props;
	const personalItems = items.filter((item) =>
		item.dinerIds.includes(diner.id),
	);

	const originalTax = new Prisma.Decimal(receipt.tax || 0).toNumber();
	const originalTip = new Prisma.Decimal(receipt.tip || 0).toNumber();
	const originalSubtotal = new Prisma.Decimal(receipt.subtotal || 0).toNumber();

	const subtotal = personalItems.reduce(
		(acc, item) =>
			acc + new Prisma.Decimal(item.price).toNumber() / item.dinerIds.length,
		0,
	);

	const taxRate = originalTax / originalSubtotal;

	const personalTax = subtotal * taxRate;

	const tipRate = originalTip / originalSubtotal;

	const personalTip = subtotal * tipRate;

	const personalTotal = subtotal + personalTax + personalTip;

	return (
		<>
			<CardHeader>{diner.name}</CardHeader>
			<CardContent>
				{personalItems.map((item) => (
					<LineItem
						name={item.name}
						price={
							new Prisma.Decimal(item.price).toNumber() / item.dinerIds.length
						}
						key={item.id}
					/>
				))}
			</CardContent>
			<CardContent className='flex flex-col w-full'>
				<LineItem name='Subtotal' price={subtotal} />
				<LineItem name='Tax' price={personalTax} />
				<LineItem name='Tip' price={personalTip} />
				<LineItem name='Total' price={personalTotal} bold />
			</CardContent>
			<CardFooter>
				<Button className='w-full' variant='outline'>
					Request
				</Button>
			</CardFooter>
		</>
	);
};
