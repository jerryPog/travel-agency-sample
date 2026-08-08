import { useNavigate } from 'react-router-dom';
import { ItineraryWizardModal } from '../components/ItineraryWizardModal';

export function CustomItineraryPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[80dvh] flex items-center justify-center py-8">
      <ItineraryWizardModal onClose={() => navigate('/')} />
    </div>
  );
}
