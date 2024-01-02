import Logo from '@/components/Logo';

export default function SimpleHeader() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-6">
      <Logo />
    </header>
  );
}
