'use client';

import { useState, useTransition } from 'react';

import '@uploadthing/react/styles.css';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { processReceipt } from '@/app/dashboard/action';

import { Icons } from './icons';
import { UploadDropzone } from '@/utils/uploadthing';


const CreateNewReceipt = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);
	const [url, setUrl] = useState('');

	const handleCreateReceipt = async () => {
		startTransition(async () => {
			const receipt = await processReceipt(url);
			router.push(`/dashboard/${receipt.id}/items`);
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='default' size='sm' onClick={() => setOpen(true)}>
					Create New Receipt
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Create New Receipt</DialogTitle>
					<DialogDescription>
						Upload a photo of your receipt to get started, or skip to the next
						step
					</DialogDescription>
				</DialogHeader>
				{!url && (
					<UploadDropzone
						endpoint='imageUploader'
						onClientUploadComplete={(res) => {
							if (res && res.length > 0) {
								setUrl(res[0].url);
							}
						}}
						onUploadError={(error: Error) => {
							setUrl('');
						}}
					/>
				)}
				{url && (
					<div className='mb-4 flex w-full justify-center'>
						<Image
							src={url}
							alt='uploaded receipt preview'
							width={300}
							height={300}
						/>
					</div>
				)}
				<div className='flex flex-row justify-between gap-2'>
					{url && (
						<Button variant='outline' onClick={() => setUrl('')}>
							Reset
						</Button>
					)}
					{url && (
						<Button onClick={() => handleCreateReceipt()} disabled={isPending}>
							{isPending && (
								<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
							)}
							Create Receipt
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateNewReceipt;
