interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return <div className="mb-4 text-2xl font-bold xl:text-3xl">{title}</div>;
}
