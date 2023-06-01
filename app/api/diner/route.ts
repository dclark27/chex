import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
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
	const diners = await db.diner.findMany({
		where: {
			receiptId: request.receiptId,
		},
	});
	return new NextResponse(JSON.stringify(diners));
}

export async function DELETE(request: { receiptId: number; dinerId: number }) {
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
	const diners = await db.diner.findMany({
		where: {
			receiptId: request.receiptId,
		},
	});

	const diner = diners.find((diner) => diner.id === request.dinerId);

	if (!diner) {
		return new NextResponse(null, { status: 404 });
	}

	await db.diner.delete({
		where: {
			id: request.dinerId,
		},
	});
	revalidatePath(`/split/${request.receiptId}/people`);
	return new NextResponse(null, { status: 204 });
}

export async function POST(request: {
	receiptId: number;
	diners: { name: string; id?: number }[];
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

	const newDiners = request.diners.map(async (diner) => {
		return await db.diner.upsert({
			where: {
				id: diner.id || -1,
			},
			create: {
				name: diner.name,
				receiptId: request.receiptId,
			},
			update: {
				name: diner.name,
				id: diner.id,
				receiptId: request.receiptId,
			},
		});
	});

	const createdDiners = await Promise.all(newDiners);
	return new NextResponse(JSON.stringify(createdDiners));
}
