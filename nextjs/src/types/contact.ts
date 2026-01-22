export interface ContactFormData {
  type: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
}

export interface ContactSubmissionRequest {
  userEmail: string;
  formData: ContactFormData;
}

export interface ContactSubmissionResponse {
  success: boolean;
  data?: any;
  error?: string;
}