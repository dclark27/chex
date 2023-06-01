import { GET as getUser } from '@/app/api/user/route';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
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
	const receipts = await db.receipt.findMany({
		where: {
			userId: user.id,
		},
	});
	return new NextResponse(JSON.stringify(receipts));
}

export async function POST(request: {
	tax: number;
	tip: number;
	subtotal: number;
	notes: string;
	total: number;
}) {
	const { userId } = auth();

	if (!userId || typeof userId !== 'string') {
		return new NextResponse(null, { status: 401 });
	}

	const userResponse = await getUser();
	const user: User = await userResponse.json();

	if (!user) {
		return new NextResponse(null, { status: 401 });
	}
	const receipt = await db.receipt.create({
		data: {
			userId: user.id,
			date: new Date(),
			tax: request.tax,
			tip: request.tip,
			subtotal: request.subtotal,
			total: request.total,
		},
	});
	return new NextResponse(JSON.stringify(receipt));
}

export async function DELETE(request: { id: number }) {
	const { userId } = auth();

	if (!userId || typeof userId !== 'string') {
		return new NextResponse(null, { status: 401 });
	}

	const userResponse = await getUser();
	const user: User = await userResponse.json();

	if (!user) {
		return new NextResponse(null, { status: 401 });
	}

	const receipt = await db.receipt.findUnique({
		where: {
			id: request.id,
		},
	});

	if (!receipt) {
		return new NextResponse(null, { status: 404 });
	}

	if (receipt.userId !== user.id) {
		return new NextResponse(null, { status: 401 });
	}

	await db.receipt.delete({
		where: {
			id: request.id,
		},
	});
	return new NextResponse(null, { status: 200 });
}
