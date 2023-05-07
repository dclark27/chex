// src/env.mjs
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
		CLERK_SECRET_KEY: z.string().min(1),
		POSTGRES_URL: z.string().url(),
		POSTGRES_URL_NON_POOLING: z.string().url(),
		POSTGRES_PRISMA_URL: z.string().url(),
		POSTGRES_HOST: z.string().url(),
		POSTGRES_USER: z.string().min(1),
		POSTGRES_PASSWORD: z.string().min(1),
		POSTGRES_DATABASE: z.string().min(1),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get typeerrors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_APP_URL: z.string().url(),
	},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		POSTGRES_URL: process.env.POSTGRES_URL,
		POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
		POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
		POSTGRES_HOST: process.env.POSTGRES_HOST,
		POSTGRES_USER: process.env.POSTGRES_USER,
		POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
		POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});
