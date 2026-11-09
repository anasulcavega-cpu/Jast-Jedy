import { useEffect, useState } from 'react';
import { trackEvent } from '../utils/analytics';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Detect standalone mode (already installed & running full screen)
    const checkStandalone = () => {
      const standaloneQuery = window.matchMedia('(display-mode: standalone)').matches;
      const navigatorStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      const isApp = standaloneQuery || navigatorStandalone;
      setIsStandalone(isApp);
      if (isApp) {
        setIsInstalled(true);
      }
    };

    checkStandalone();

    // 2. Detect iOS devices (iPhone, iPad, iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);

    // 3. Native beforeinstallprompt event (Chromium, Android Chrome, Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browser default mini-infobar
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // 4. appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      trackEvent('pwa_app_installed', 'PWA', 'User installed application');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = async (): Promise<'accepted' | 'dismissed' | 'ios' | 'unsupported'> => {
    // On iOS Safari, we must present the manual guide
    if (isIOS) {
      trackEvent('pwa_ios_guide_opened', 'PWA', 'iOS User opened install modal');
      return 'ios';
    }

    if (!deferredPrompt) {
      return 'unsupported';
    }

    try {
      trackEvent('pwa_install_prompt_shown', 'PWA', 'Prompt presented to user');
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        trackEvent('pwa_install_accepted', 'PWA', 'Installation accepted');
        return 'accepted';
      } else {
        trackEvent('pwa_install_dismissed', 'PWA', 'Installation dismissed');
        return 'dismissed';
      }
    } catch (err) {
      console.warn('PWA prompt error:', err);
      return 'unsupported';
    }
  };

  return {
    isInstallable: !!deferredPrompt || (isIOS && !isStandalone),
    deferredPrompt,
    isInstalled,
    isStandalone,
    isIOS,
    triggerInstall,
  };
}
