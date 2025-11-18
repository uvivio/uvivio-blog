import { Dot, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';
import AppLogo from '../app-logo';

type PageLoaderProps = {
  text?: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
};

const PageLoader = ({ text, subtitle, icon }: PageLoaderProps) => {
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen select-none flex-col justify-between bg-white">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="-mr-12 mb-6 animate-pulse">
          <AppLogo canNavigate={false} className="!h-16 sm:!h-20" />
        </div>

        <h2 className="mb-1 text-base font-semibold text-gray-800">
          Please wait
        </h2>
        <div className="flex items-center justify-center gap-1 text-lg text-primary-6">
          {icon ?? <Loader2 className="animate-spin" />}
          <p className="text-center font-medium">
            {text ?? subtitle ?? 'Almost done...'}
          </p>
        </div>

        <span className="mt-1 flex items-center text-xs text-gray-500">
          <Dot color="#d31119" /> This won&apos;t take long
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
