import currency from 'currency.js';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { getReceipt } from '../action';

interface ReceiptsPageProps {
	params: { receiptId: string };
}

export default async function Page({ params }: ReceiptsPageProps) {
	const receipt = await getReceipt(params.receiptId);

	const assignmentsMap: {
		[dinerId: string]: { name: string; price: number; id: number }[];
	} = {};

	receipt?.assignmentsTable?.forEach(({ diner_id, dish_id }) => {
		if (!diner_id || !dish_id) return;
		if (!assignmentsMap[diner_id]) {
			assignmentsMap[diner_id] = [];
		}
		const dish = receipt?.items?.find((item) => item.id === dish_id);

		if (!dish) return;

		assignmentsMap[diner_id].push({
			name: dish.name || '',
			price: dish.price || 0,
			id: dish.id || -1,
		});
	});
	const receiptDate = new Date(receipt.receipt.receiptDate || Date.now());
	return (
		<div className='flex max-w-sm flex-col gap-5'>
			<div className='flex flex-row items-end justify-between'>
				<span className='text-2xl font-semibold'> {receipt.receipt.notes}</span>
				<span className='text-sm'>{receiptDate.toLocaleDateString()}</span>
			</div>
			{receipt?.diners?.map((diner) => {
				let total = 0;
				const taxRate =
					receipt?.receipt?.tax !== 0
						? (receipt?.receipt?.tax || 0) / (receipt?.receipt?.total || 1)
						: 0;
				const tipRate =
					receipt?.receipt?.tip !== 0
						? (receipt?.receipt?.tip || 0) / (receipt?.receipt?.total || 1)
						: 0;
				const items = assignmentsMap[diner.id];
				if (!diner || !items) return null;

				return (
					<Card key={diner.id}>
						<CardHeader>
							<CardTitle>{diner.name}</CardTitle>
						</CardHeader>
						<CardContent>
							{items.map((item, index) => {
								if (!item.price || !item) {
									return null;
								}

								// Count the number of other diners with this item
								let count = 0;

								Object.keys(assignmentsMap).forEach((key) => {
									const usersDishes = assignmentsMap[key];
									if (!usersDishes) return;
									usersDishes.forEach((dish) => {
										if (dish.id === item.id) {
											count++;
										}
									});
								});

								const price = item.price / count;

								total += price;

								return (
									<div key={index} className='flex justify-between'>
										<span className='text-xs'>{item.name}</span>
										<span className='text-xs'>{currency(price).format()}</span>
									</div>
								);
							})}
						</CardContent>
						<CardFooter className='flex w-full flex-col'>
							<div className='flex w-full justify-between'>
								<span className='text-xs'>Subtotal</span>
								<span className='text-xs'>{currency(total).format()}</span>
							</div>
							<div className='flex w-full justify-between'>
								<span className='text-xs'>Tax</span>
								<span className='text-xs'>
									{currency(taxRate * total).format()}
								</span>
							</div>{' '}
							<div className='flex w-full justify-between'>
								<span className='text-xs'>Tip</span>
								<span className='text-xs'>
									{currency(tipRate * total).format()}
								</span>
							</div>
							<div className='flex w-full justify-between'>
								<span className='text-xs font-bold'>Total</span>
								<span className='text-xs font-bold'>
									{currency(tipRate * total + taxRate * total + total).format()}
								</span>
							</div>
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
}
