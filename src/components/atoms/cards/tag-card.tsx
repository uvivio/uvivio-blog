import { generateColorFromText } from '@/utils/helpers';
import classNames from 'classnames';
import React from 'react';

const TagCard = ({ tag, className }: { tag: string; className?: string }) => {
  const opacity_background = generateColorFromText(tag, 0.1);
  const background = generateColorFromText(tag);
  return (
    <div
      style={{ background: opacity_background, borderColor: background }}
      className={classNames(
        'whitespace-nowrap rounded border bg-opacity-50 p-1 px-2.5 font-primary text-xs capitalize tracking-tight',
        className
      )}
    >
      {tag.toLowerCase()}
    </div>
  );
};

export default TagCard;
