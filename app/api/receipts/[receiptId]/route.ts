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
	});
	if (!user) {
		return new NextResponse(null, { status: 401 });
	}
	const receipt = await db.receipt.findUnique({
		where: {
			id: request.receiptId,
		},
	});
	return new NextResponse(JSON.stringify(receipt));
}
