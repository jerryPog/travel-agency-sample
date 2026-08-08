export interface ContactFormData {
  name: string;
  email: string;
  travelDates?: string;
  message?: string;
}

export interface ItineraryWizardData {
  duration: string;
  travelers: string;
  interests: string[];
  budget: string;
  name: string;
  email: string;
  notes?: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(data: ContactFormData): Promise<FormSubmissionResult> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter a valid name (at least 2 characters).';
  }

  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: 'Form validation failed.', errors };
  }

  // Simulate network API request delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: 'Thank you for reaching out! We will contact you within 24 hours.',
  };
}

export async function submitItineraryWizard(data: ItineraryWizardData): Promise<FormSubmissionResult> {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter a valid name.';
  }

  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: 'Validation failed.', errors };
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    success: true,
    message: 'Your custom itinerary request has been submitted successfully!',
  };
}
