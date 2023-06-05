import SiteHeader from '@/components/site-header';

interface MarketingLayoutProps {
	children: React.ReactNode;
}

export default async function MarketingLayout({
	children,
}: MarketingLayoutProps) {
	return (
		<div className='flex min-h-screen flex-col'>
			<SiteHeader />
			{children}
		</div>
	);
}
