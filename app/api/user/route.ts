import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
	const { userId } = auth();

	if (!userId || typeof userId !== 'string') {
		return new NextResponse(null, { status: 401 });
	}

	let user = await db.user.findUnique({
		where: {
			clerkId: userId,
		},
	});

	if (!user) {
		user = await db.user.create({
			data: {
				clerkId: userId,
				nickname: '',
			},
		});

		return new NextResponse(null, { status: 401 });
	}

	return new NextResponse(JSON.stringify(user));
}
