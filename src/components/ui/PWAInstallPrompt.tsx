'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { DownloadOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { usePWA } from '@/hooks/customHooks/usePWA';

const { Text, Title } = Typography;

export default function PWAInstallPrompt() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show prompt if installable and not installed
    if (isInstallable && !isInstalled && !isDismissed) {
      // Delay showing the prompt to not interrupt initial load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, isDismissed]);

  const handleInstall = async () => {
    try {
      await installApp();
      setIsVisible(false);
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Store dismissal in localStorage
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Check if user previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  if (!isVisible || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card
        className="shadow-lg border-blue-200"
        style={{ backgroundColor: '#f0f8ff' }}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <DownloadOutlined className="text-blue-600 text-xl" />
          </div>
          
          <div className="flex-1 min-w-0">
            <Title level={5} className="mb-1">
              Install Financial App
            </Title>
            <Text className="text-gray-600 text-sm">
              Get quick access to your transactions with our app. Works offline and loads faster.
            </Text>
            
            <Space className="mt-3">
              <Button
                type="primary"
                size="small"
                icon={<CheckCircleOutlined />}
                onClick={handleInstall}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Install
              </Button>
              <Button
                size="small"
                icon={<CloseOutlined />}
                onClick={handleDismiss}
              >
                Not now
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
} 