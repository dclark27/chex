export default function SplitLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <main className='flex gap-5 flex-col pl-4 pr-4'>{children}</main>;
}
