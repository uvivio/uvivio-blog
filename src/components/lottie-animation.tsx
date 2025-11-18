import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

interface LottieAnimationProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  src,
  loop = true,
  autoplay = true,
  className,
}) => {
  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
};

export default LottieAnimation;
