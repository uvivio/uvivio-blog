'use client';

import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type Props = {
  buttonText?: ReactNode;
  disabled?: boolean;
  handleGoBack?(): void;
  link?: string;
};

const PageBackButton = ({
  buttonText = 'Back',
  handleGoBack,
  disabled,
  link,
}: Props) => {
  const router = useRouter();

  const onClick = () => {
    if (handleGoBack) handleGoBack();
    else router.back();
  };

  const Button = () => (
    <button
      type="button"
      disabled={disabled}
      role="button"
      onClick={link ? undefined : onClick}
      className="flex items-center gap-1 font-primary duration-300 disabled:cursor-not-allowed disabled:text-gray-300"
    >
      <LeftOutlined className="text-lg" />
      <p className="font-semibold tracking-tight">{buttonText}</p>
    </button>
  );

  if (disabled) return <Button />;

  if (link)
    return (
      <span className="flex">
        <Link href={link}>
          <Button />
        </Link>
      </span>
    );
  return <Button />;
};

export default PageBackButton;
