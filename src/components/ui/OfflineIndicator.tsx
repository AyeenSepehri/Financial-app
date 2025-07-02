'use client';

import { Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { usePWA } from '@/hooks/customHooks/usePWA';

export default function OfflineIndicator() {
  const { isOffline } = usePWA();

  if (!isOffline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Alert
        message="You're offline"
        description="Some features may be limited. Your data will sync when you're back online."
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        className="border-yellow-200 bg-yellow-50"
        banner
      />
    </div>
  );
} 