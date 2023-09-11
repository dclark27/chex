import { Icons } from '@/components/icons';

export interface NavItem {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	label?: string;
}

export interface MainNavItem extends NavItem {}

interface DocsConfig {
	mainNav: MainNavItem[];
}

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: 'Dashboard',
			href: '/dashboard',
		},
		{
			title: 'Account',
			href: '/account',
		},
		{
			title: 'GitHub',
			href: 'https://github.com/devin_clark',
			external: true,
		},
		{
			title: 'Twitter',
			href: 'https://twitter.com/dclark27/chex',
			external: true,
		},
	],
};
