import { ImageResponse } from '@vercel/og';

export async function GET(req: Request) {
	try {
		return new ImageResponse(
			(
				<div
					style={{
						fontSize: 100,
						color: 'black',
						background: 'white',
						width: '100%',
						height: '100%',
						padding: '50px 200px',
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					😋 Chex
				</div>
			),
			{
				width: 1200,
				height: 630,
				emoji: 'twemoji',
			},
		);
	} catch (error) {
		return new Response(`Failed to generate image`, {
			status: 500,
		});
	}
}
