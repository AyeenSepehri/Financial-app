import { useState, useEffect, useCallback } from 'react';

interface PWAInstallPrompt extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  isOnline: boolean;
  installApp: () => Promise<void>;
  requestNotificationPermission: () => Promise<boolean>;
  sendNotification: (title: string, options?: NotificationOptions) => void;
}

export const usePWA = (): UsePWAReturn => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(null);

  // Check if app is installed
  useEffect(() => {
    const checkInstallation = () => {
      // Check if running in standalone mode (installed)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInApp = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
      setIsInstalled(isStandalone || isInApp);
    };

    checkInstallation();
    window.addEventListener('appinstalled', checkInstallation);
    
    return () => {
      window.removeEventListener('appinstalled', checkInstallation);
    };
  }, []);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as PWAInstallPrompt);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsOffline(true);
    };

    // Set initial state
    setIsOnline(navigator.onLine);
    setIsOffline(!navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Install app function
  const installApp = useCallback(async () => {
    if (!deferredPrompt) {
      console.log('No install prompt available');
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsInstallable(false);
        setDeferredPrompt(null);
      } else {
        console.log('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Error installing app:', error);
    }
  }, [deferredPrompt]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      console.log('Notification permission denied');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, []);

  // Send notification
  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      console.log('Notifications not supported or permission not granted');
      return;
    }

    try {
      new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }, []);

  return {
    isInstallable,
    isInstalled,
    isOffline,
    isOnline,
    installApp,
    requestNotificationPermission,
    sendNotification
  };
}; 