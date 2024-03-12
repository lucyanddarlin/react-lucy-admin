import { NavLink } from 'react-router-dom';

import { useThemeToken } from '@/theme/hooks';

interface Props {
  className?: string;
}

function Logo({ className }: Props) {
  const { colorPrimary } = useThemeToken();

  return (
    <NavLink to="/" className="no-underline">
      <button className={`font-semibold ${className}`} style={{ color: colorPrimary }}>
        Lucy
      </button>
    </NavLink>
  );
}

export default Logo;
