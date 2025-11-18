import { AppleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

type Props = {
  buttonText?: React.ReactNode;
  className?: string;
  cbUrl?: string;
};

const AppleAuthButton = ({
  buttonText,
  children,
  className,
}: React.PropsWithChildren<Props>) => {
  const handleClick = async () => {
    //
  };
  return (
    <button
      onClick={handleClick}
      className={classNames(
        'flex items-center justify-center gap-3 rounded-lg bg-black p-3 px-4 font-primary font-[500] text-white duration-300',
        className
      )}
    >
      <AppleFilled className="text-xl" />
      <p className="">{buttonText || children || 'Continue with Apple'}</p>
    </button>
  );
};

export default AppleAuthButton;
