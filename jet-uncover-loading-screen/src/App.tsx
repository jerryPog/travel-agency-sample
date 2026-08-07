import { useState, useCallback } from 'react';
import { LoaderConfig } from './types';
import { JetLoaderOverlay } from './components/JetLoaderOverlay';
import { WebsiteContent } from './components/WebsiteContent';
import { LoaderControlsModal } from './components/LoaderControlsModal';

export default function App() {
  const [config, setConfig] = useState<LoaderConfig>({
    duration: 2.0, // Default 2.0 seconds as explicitly requested by user
    jetLivery: 'pearl_gold',
    uncoverStyle: 'direct_wipe',
    enableSound: true,
    showContrails: true,
    showCloudEffects: true,
    customBrandName: 'APEX AVIATION',
    customHeroTitle: 'The Pinnacle of Private Aviation',
    customHeroSubtitle: 'Experience non-stop global flights on the world’s most advanced private jet fleet.',
    customPrimaryColor: '#0EA5E9',
  });

  // Active by default so user sees the 2-second Jet Loader immediately upon opening!
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  const handleTriggerLoader = useCallback(() => {
    setIsLoaderActive(false);
    setTimeout(() => {
      setIsLoaderActive(true);
    }, 50);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaderActive(false);
  }, []);

  const handleChangeConfig = useCallback((newConfig: Partial<LoaderConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative">
      
      {/* 2-Second Private Jet Uncover Loading Screen Overlay */}
      <JetLoaderOverlay
        config={config}
        isActive={isLoaderActive}
        onComplete={handleLoaderComplete}
      />

      {/* Website Content Uncovered Underneath */}
      <WebsiteContent
        config={config}
        onTriggerLoader={handleTriggerLoader}
        onOpenControls={() => setIsControlsOpen(true)}
      />

      {/* Customizer & Code Export Modal */}
      <LoaderControlsModal
        config={config}
        isOpen={isControlsOpen}
        onClose={() => setIsControlsOpen(false)}
        onChangeConfig={handleChangeConfig}
        onReplayLoader={handleTriggerLoader}
      />
    </div>
  );
}
