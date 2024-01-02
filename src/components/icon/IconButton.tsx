import { ButtonProps } from 'antd';
import { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & ButtonProps;

export default function IconButton({ children, style, className, onClick }: Props) {
  return (
    <button
      style={style}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover ${className}`}
    >
      {children}
    </button>
  );
}
