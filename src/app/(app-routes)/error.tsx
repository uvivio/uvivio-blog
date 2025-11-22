"use client";

import AppLogo from "@/components/atoms/app-logo";
import PrimaryButton from "@/components/atoms/buttons/primary-button";
import * as Sentry from "@sentry/nextjs";
import { Result } from "antd";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ErrorBoundaryHandlerProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundaryHandler({
  error,
  reset,
}: ErrorBoundaryHandlerProps) {
  console.dir({ error }, { depth: Infinity });
  document.title = "Application Error";
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/studio")) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <>
      <nav className="sticky top-0 z-40 mx-auto w-full select-none bg-tertiary-3 p-1 py-5">
        <div className="mx-auto flex w-full items-center justify-between px-6 lg:px-12">
          <AppLogo />
        </div>
      </nav>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <Result
          status="500"
          title="An unexpected error occurred."
          subTitle={error.message || "Something went wrong"}
          extra={[
            <PrimaryButton
              variant="outlined"
              onClick={() => {
                if (history.length > 0) history.back();
                else location.href = "/dashboard";
              }}
              className="p-3 px-20"
              key={"home"}
            >
              Go back
            </PrimaryButton>,
            <PrimaryButton
              onClick={() => reset()}
              className="p-3 px-20"
              key={"retry"}
            >
              Retry
            </PrimaryButton>,
          ]}
        />
      </div>
    </>
  );
}

// 'use client';

// import AppLogo from '@/components/atoms/app-logo';
// import PrimaryButton from '@/components/atoms/buttons/primary-button';
// import { Button, Form, Input, notification, Result } from 'antd';

// interface ErrorBoundaryHandlerProps {
// 	error: Error;
// 	reset: () => void;
// }

// export default function ErrorBoundaryHandler({ error, reset }: ErrorBoundaryHandlerProps) {
// 	console.log('ErrorBoundaryHandler: ', error);

// 	const handleBugReportSubmit = (values: { name: string; email: string; description: string }) => {
// 		console.log('Bug Report Submitted:', values);
// 		notification.success({
// 			message: 'Bug Report Submitted',
// 			description: 'Thank you for reporting the bug! We will look into it.',
// 		});
// 	};

// 	return (
// 		<>
// 			<nav className='sticky top-0 w-full bg-tertiary-3 p-1 py-5 z-40 select-none mx-auto'>
// 				<div className='flex items-center justify-between px-6 lg:px-12 mx-auto w-full'>
// 					<AppLogo />
// 				</div>
// 			</nav>
// 			<div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
// 				<Result
// 					status='500'
// 					title='An unexpected error occurred.'
// 					subTitle={error.message || 'Something went wrong'}
// 					extra={[
// 						<PrimaryButton
// 							variant='outlined'
// 							onClick={() => {
// 								if (history.length > 0) history.back();
// 								else location.href = '/dashboard';
// 							}}
// 							className='p-3 px-20'
// 							key={'home'}>
// 							Go back
// 						</PrimaryButton>,
// 						<PrimaryButton onClick={() => reset()} className='p-3 px-20' key={'retry'}>
// 							Retry
// 						</PrimaryButton>,
// 					]}
// 				/>
// 				<div className='w-full max-w-lg mx-auto mt-8'>
// 					<h2 className='text-lg font-semibold mb-4'>Report the Bug</h2>
// 					<Form
// 						name='bugReport'
// 						onFinish={handleBugReportSubmit}
// 						layout='vertical'
// 						initialValues={{ name: '', email: '', description: '' }}>
// 						<Form.Item
// 							name='name'
// 							label='Your Name'
// 							rules={[{ required: true, message: 'Please enter your name' }]}>
// 							<Input placeholder='Enter your name' />
// 						</Form.Item>

// 						<Form.Item
// 							name='email'
// 							label='Your Email'
// 							rules={[
// 								{ required: true, message: 'Please enter your email' },
// 								{ type: 'email', message: 'Please enter a valid email' },
// 							]}>
// 							<Input placeholder='Enter your email' />
// 						</Form.Item>

// 						<Form.Item
// 							name='description'
// 							label='Bug Description'
// 							rules={[{ required: true, message: 'Please describe the bug' }]}>
// 							<Input.TextArea rows={4} placeholder='Describe the bug you encountered' />
// 						</Form.Item>

// 						<Form.Item>
// 							<Button type='primary' htmlType='submit' block>
// 								Submit Bug Report
// 							</Button>
// 						</Form.Item>
// 					</Form>
// 				</div>
// 			</div>
// 		</>
// 	);
// }
