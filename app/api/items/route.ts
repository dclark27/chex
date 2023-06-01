import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(request: { receiptId: number }) {
	const { userId } = auth();
	if (!userId || typeof userId !== 'string') {
		return new NextResponse(null, { status: 401 });
	}
	const user = await db.user.findUnique({
		where: {
			clerkId: userId,
		},
		include: {
			receipts: true,
		},
	});
	if (!user) {
		return new NextResponse(null, { status: 401 });
	}
	const receipt = user.receipts.find(
		(receipt) => receipt.id === request.receiptId,
	);
	if (!receipt) {
		return new NextResponse(null, { status: 404 });
	}
	if (receipt.userId !== user.id) {
		return new NextResponse(null, { status: 401 });
	}
	const receiptItems = await db.receiptItem.findMany({
		where: {
			receiptId: request.receiptId,
		},
	});
	return new NextResponse(JSON.stringify(receiptItems));
}

export async function DELETE(request: {
	receiptId: number;
	receiptItemId: number;
}) {
	const { userId } = auth();
	if (!userId || typeof userId !== 'string') {
		return new NextResponse(null, { status: 401 });
	}
	const user = await db.user.findUnique({
		where: {
			clerkId: userId,
		},
	});
	if (!user) {
		return new NextResponse(null, { status: 401 });
	}
	const receipt = await db.receipt.findUnique({
		where: {
			id: request.receiptId,
		},
	});
	if (!receipt) {
		return new NextResponse(null, { status: 404 });
	}
	if (receipt.userId !== user.id) {
		return new NextResponse(null, { status: 401 });
	}
	const receiptItems = await db.receiptItem.findMany({
		where: {
			receiptId: request.receiptId,
		},
	});

	const receiptItem = receiptItems.find(
		(receiptItem) => receiptItem.id === request.receiptItemId,
	);

	if (!receiptItem) {
		return new NextResponse(null, { status: 404 });
	}

	await db.receiptItem.delete({
		where: {
			id: request.receiptItemId,
		},
	});

	return new NextResponse(null, { status: 204 });
}

export async function POST(request: {
	receiptId: number;
	receiptItems: { name: string; price: number; id?: number }[];
}) {
	const { userId } = auth();
	if (!userId || typeof userId !== 'string') {
		return new NextResponse(null, { status: 401 });
	}
	const user = await db.user.findUnique({
		where: {
			clerkId: userId,
		},
	});
	if (!user) {
		return new NextResponse(null, { status: 401 });
	}
	const receipt = await db.receipt.findUnique({
		where: {
			id: request.receiptId,
		},
	});
	if (!receipt) {
		return new NextResponse(null, { status: 404 });
	}
	if (receipt.userId !== user.id) {
		return new NextResponse(null, { status: 401 });
	}

	const newReceiptItems = request.receiptItems.map(async (receiptItem) => {
		return await db.receiptItem.upsert({
			where: {
				id: receiptItem.id || -1,
			},
			create: {
				name: receiptItem.name,
				price: receiptItem.price,
				receiptId: request.receiptId,
			},
			update: {
				name: receiptItem.name,
				price: receiptItem.price,
				id: receiptItem.id,
				receiptId: request.receiptId,
			},
		});
	});

	const createdReceiptItems = await Promise.all(newReceiptItems);

	return new NextResponse(JSON.stringify(createdReceiptItems));
}
