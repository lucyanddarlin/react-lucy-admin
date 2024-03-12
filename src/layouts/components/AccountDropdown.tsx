import { IconButton } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';

export default function AccountDropdown() {
  const { avatar } = useUserInfo();

  return (
    <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
      <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
    </IconButton>
  );
}
