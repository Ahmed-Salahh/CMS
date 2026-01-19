/**
 * Example data for testing
 * This provides consistent mock data across tests
 */

export const mockUser = {
  id: 'user_123',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  createdAt: '2026-01-01T00:00:00Z',
};

export const mockPrograms = [
  {
    id: 1,
    title: 'Financial Analysis Bootcamp',
    description: 'Comprehensive financial analysis training program',
    status: 'active',
    start_date: '2026-02-01',
    end_date: '2026-05-01',
    duration: '3 months',
    capacity: 30,
    enrolled: 15,
  },
  {
    id: 2,
    title: 'Investment Banking Fundamentals',
    description: 'Learn the basics of investment banking',
    status: 'upcoming',
    start_date: '2026-03-15',
    end_date: '2026-06-15',
    duration: '3 months',
    capacity: 25,
    enrolled: 0,
  },
  {
    id: 3,
    title: 'Advanced Portfolio Management',
    description: 'Master portfolio management strategies',
    status: 'active',
    start_date: '2026-01-10',
    end_date: '2026-04-10',
    duration: '3 months',
    capacity: 20,
    enrolled: 18,
  },
  {
    id: 4,
    title: 'Corporate Finance Essentials',
    description: 'Essential corporate finance concepts and applications',
    status: 'completed',
    start_date: '2025-10-01',
    end_date: '2025-12-31',
    duration: '3 months',
    capacity: 30,
    enrolled: 30,
  },
];

export const mockProgramsResponse = {
  programs: mockPrograms,
  total: mockPrograms.length,
  page: 1,
  per_page: 8,
  total_pages: 1,
};

export const mockMedia = [
  {
    id: 1,
    title: 'Introduction to Financial Markets',
    type: 'video',
    duration: '45:30',
    thumbnail: '/images/media/thumb1.jpg',
    uploaded_at: '2026-01-15',
  },
  {
    id: 2,
    title: 'Financial Modeling Best Practices',
    type: 'document',
    pages: 50,
    thumbnail: '/images/media/thumb2.jpg',
    uploaded_at: '2026-01-10',
  },
];

export const mockWorkflows = [
  {
    id: 1,
    name: 'Onboarding Process',
    description: 'New user onboarding workflow',
    status: 'active',
    steps: 5,
    created_at: '2026-01-01',
  },
  {
    id: 2,
    name: 'Program Enrollment',
    description: 'Program enrollment approval workflow',
    status: 'active',
    steps: 3,
    created_at: '2026-01-05',
  },
];

export const mockApiError = {
  error: 'Internal server error',
  message: 'Something went wrong',
  status: 500,
};

export const mockValidationError = {
  error: 'Validation error',
  message: 'Invalid input provided',
  fields: {
    email: 'Email is required',
    password: 'Password must be at least 8 characters',
  },
  status: 400,
};
