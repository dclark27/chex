import Link from 'next/link';
import { buttonVariants } from './ui/button';

interface FooterProps {
	next: __next_route_internal_types__.RouteImpl<'/'>;
	back: __next_route_internal_types__.RouteImpl<'/'>;
}

const FooterNav = (props: FooterProps) => {
	const { next, back } = props;
	return (
		<div className='flex justify-between w-full'>
			<Link className={buttonVariants({ variant: 'outline' })} href={back}>
				Back
			</Link>
			<Link className={buttonVariants({ variant: 'outline' })} href={next}>
				Next
			</Link>
		</div>
	);
};

export default FooterNav;
