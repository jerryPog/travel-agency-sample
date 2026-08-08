import { useNavigate } from 'react-router-dom';
import { ItineraryWizardModal } from '../components/ItineraryWizardModal';
import { AnimatedPage } from '../components/AnimatedPage';

export function CustomItineraryPage() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="w-full min-h-[85dvh] flex flex-col items-center justify-center py-10 px-4">
        <ItineraryWizardModal isModal={false} onClose={() => navigate('/')} />
      </div>
    </AnimatedPage>
  );
}
