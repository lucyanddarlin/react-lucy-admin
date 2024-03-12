import { Badge } from 'antd';

import { IconButton, Iconify } from '@/components/icon';

export default function NoticeButton() {
  return (
    <div>
      <IconButton>
        <Badge count={4} styles={{ root: { color: 'inherit' }, indicator: { color: '#fff' } }}>
          <Iconify icon="solar:bell-bing-bold-duotone" size={24} />
        </Badge>
      </IconButton>
    </div>
  );
}
