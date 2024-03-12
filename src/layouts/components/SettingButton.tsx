import { m } from 'framer-motion';

import { IconButton, SvgIcon } from '@/components/icon';

export default function SettingButton() {
  return (
    <div className="flex items-center justify-center">
      <m.div
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 12,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileTap="tap"
        whileHover="hover"
      >
        <IconButton className="h-10 w-10">
          <SvgIcon icon="ic-setting" size="24" />
        </IconButton>
      </m.div>
    </div>
  );
}
