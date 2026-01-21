import PageHero from "@/components/page-hero";
import Footer from "@/components/footer";
import { FAQsClientWrapper } from "./faqs-client-wrapper";
import { FAQsResponse, FAQCategory } from "@/types/faqs";

// Mock data for development/fallback
const mockCategories: FAQCategory[] = [
  {
    id: 1,
    name: "Payment",
    slug: "payment",
    description:
      "Here you can find any payment related issues you may find in your way of learning with us.",
    order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    faqs: [
      {
        id: 1,
        question: "How do I update my account information?",
        answer:
          "You can update your account information by logging into your account and navigating to the Settings page. From there, you can edit your personal details, contact information, and preferences.",
        category_id: 1,
        order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        question: "What payment methods are accepted?",
        answer:
          "We accept various payment methods including credit cards (Visa, MasterCard, American Express), debit cards, bank transfers, and digital wallets. You can select your preferred payment method during checkout.",
        category_id: 1,
        order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
        question: "Are there any payment plans available?",
        answer:
          "Yes, we offer flexible payment plans for our programs. You can choose to pay in installments over the program duration. Contact our admissions team for detailed information about payment options specific to your program.",
        category_id: 1,
        order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 4,
        question: "Can I get a refund if I withdraw from the program?",
        answer:
          "Refund policies vary depending on the program and when you withdraw. Generally, full refunds are available within the first week of enrollment. After that, partial refunds may be available based on the remaining program duration. Please refer to our refund policy or contact support for specific details.",
        category_id: 1,
        order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    name: "Studying",
    slug: "studying",
    description:
      "Here you can find any studying related issues you may find in your way of learning with us.",
    order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    faqs: [
      {
        id: 5,
        question: "What is the program schedule?",
        answer:
          "Program schedules vary depending on the course. Most programs offer flexible scheduling options including full-time and part-time tracks. Detailed schedules are provided upon enrollment and can be accessed through your student portal.",
        category_id: 2,
        order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 6,
        question: "How do I access online learning materials?",
        answer:
          "All learning materials are available through our online learning management system. Once enrolled, you will receive login credentials to access course materials, videos, assignments, and other resources 24/7.",
        category_id: 2,
        order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 7,
        question: "Can I study while working full-time?",
        answer:
          "Yes, many of our programs are designed to accommodate working professionals. We offer evening and weekend classes, as well as self-paced online options that allow you to balance your studies with your work commitments.",
        category_id: 2,
        order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 8,
        question: "What support is available during my studies?",
        answer:
          "We provide comprehensive support including academic advisors, tutoring services, career counseling, and technical support. Our support team is available via email, phone, and live chat during business hours.",
        category_id: 2,
        order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 3,
    name: "Degrees",
    slug: "degrees",
    description:
      "Here you can find any degree related issues you may find in your way of learning with us.",
    order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    faqs: [
      {
        id: 9,
        question: "What certifications will I receive?",
        answer:
          "Upon successful completion of your program, you will receive a certificate or diploma recognized by relevant industry bodies. The specific certification depends on your program and may include professional credentials.",
        category_id: 3,
        order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 10,
        question: "Is the degree internationally recognized?",
        answer:
          "Yes, our degrees and certificates are internationally recognized and accredited by relevant educational authorities. We maintain partnerships with global institutions to ensure our credentials are valued worldwide.",
        category_id: 3,
        order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 11,
        question: "What are the admission requirements?",
        answer:
          "Admission requirements vary by program but typically include a high school diploma or equivalent, transcripts, and sometimes standardized test scores. Some advanced programs may require relevant work experience or prerequisite courses.",
        category_id: 3,
        order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 12,
        question: "Can I pursue multiple programs simultaneously?",
        answer:
          "In most cases, you can enroll in multiple programs simultaneously, subject to scheduling compatibility and academic advising approval. We recommend consulting with an academic advisor to ensure you can manage the workload effectively.",
        category_id: 3,
        order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  },
];

async function fetchFAQs(): Promise<FAQCategory[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/app/faqs/`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch FAQs, using mock data");
      return mockCategories;
    }

    const data: FAQsResponse = await response.json();

    if (!data.success || !data.data || data.data.length === 0) {
      return mockCategories;
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return mockCategories;
  }
}

export default async function FAQsPage() {
  const categories = await fetchFAQs();

  const breadcrumbs = [{ label: "FAQs" }];

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Hero Section */}
      <PageHero title="Frequently Asked Questions" breadcrumbs={breadcrumbs} />

      {/* Main Content Area */}
      <div className="relative flex-1">
        {/* Background gradient */}
        <div className="absolute right-0 top-0 h-full w-[78%] bg-gradient-to-r from-[#f6f8fa] to-[#f6f8fa]" />

        {/* Content Container */}
        <div className="relative container mx-auto px-[44px]">
          <FAQsClientWrapper categories={categories} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
