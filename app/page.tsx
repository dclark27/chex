import { Receipt } from '@prisma/client';
import Link from 'next/link';
import { buttonVariants } from '../components/ui/button';
import { GET as getReceipts } from './api/receipts/route';

async function getReceiptsForUser(): Promise<Receipt[]> {
	try {
		const response = await getReceipts();
		const json = await response.json();

		return json;
	} catch (error) {
		return [];
	}
}

export default async function Page() {
	const receipts = await getReceiptsForUser();
	return (
		<main className='flex flex-col text-center items-center'>
			<h3 className='scroll-m-20 text-xl font-semibold tracking-tight mb-10'>
				Split checks with friends
			</h3>
			{receipts.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>Receipt</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{receipts.map((receipt) => (
							<tr key={receipt.id}>
								<td>{receipt.date.toLocaleDateString()}</td>
								<td>{receipt.total}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<Link
				href='/split/people'
				className={buttonVariants({ variant: 'default' })}
			>
				Create a New Check
			</Link>
		</main>
	);
}
