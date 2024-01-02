import { Spin } from 'antd';
import React from 'react';

export default function CircleLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spin size="large" />
    </div>
  );
}
