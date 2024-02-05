const SiteHeader = () => {
	return (
		<header className='text-black z-40 mb-4 flex flex-col items-center justify-center gap-5 py-6 pb-5 bg-primary rounded-b-2xl w-full'>
			<h3 className='scroll-m-20 text-5xl font-extrabold tracking-tight'>
				Chex
			</h3>
			<h5 className='text-md font-medium leading-none'>
				Split checks with friends
			</h5>
		</header>
	);
};

export default SiteHeader;
