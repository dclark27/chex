export default function ReceiptLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className='mx-auto mb-10 flex max-w-sm flex-col'>{children}</div>;
}
