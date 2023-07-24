import SiteHeader from '@/components/site-header';

interface MarketingLayoutProps {
	children: React.ReactNode;
}

export default async function MarketingLayout({
	children,
}: MarketingLayoutProps) {
	return (
		<div className='container'>
			<SiteHeader />
			<div className='m-auto max-w-xs'>{children}</div>
		</div>
	);
}
