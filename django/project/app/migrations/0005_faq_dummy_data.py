# Generated data migration for FAQ dummy data
from django.db import migrations


def create_faq_data(apps, schema_editor):
    FAQCategory = apps.get_model('app', 'FAQCategory')
    FAQ = apps.get_model('app', 'FAQ')
    
    # Create FAQ Categories
    payment_category = FAQCategory.objects.create(
        Name='Payment',
        Slug='payment',
        Description='Here you can find any payment related issues you may find in your way of learning with us.',
        Icon='credit-card',
        Order=1,
        IsActive=True
    )
    
    studying_category = FAQCategory.objects.create(
        Name='Studying',
        Slug='studying',
        Description='Here you can find any studying related issues you may find in your way of learning with us.',
        Icon='book-open',
        Order=2,
        IsActive=True
    )
    
    degrees_category = FAQCategory.objects.create(
        Name='Degrees',
        Slug='degrees',
        Description='Here you can find any degree related issues you may find in your way of learning with us.',
        Icon='graduation-cap',
        Order=3,
        IsActive=True
    )
    
    # Payment FAQs
    FAQ.objects.create(
        Category=payment_category,
        Question='How do I update my account information?',
        Answer='You can update your account information by logging into your account and navigating to the Settings page. From there, you can edit your personal details, contact information, and payment preferences. Make sure to save your changes before leaving the page.',
        Order=1,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=payment_category,
        Question='What payment methods are accepted?',
        Answer='We accept various payment methods including credit cards (Visa, MasterCard, American Express), debit cards, bank transfers, and digital wallets such as Apple Pay and Google Pay. You can select your preferred payment method during the checkout process.',
        Order=2,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=payment_category,
        Question='Are there any payment plans available?',
        Answer='Yes, we offer flexible payment plans for our programs. You can choose to pay in installments over the program duration. Contact our admissions team for detailed information about payment options specific to your program.',
        Order=3,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=payment_category,
        Question='Can I get a refund if I withdraw from the program?',
        Answer='Refund policies vary depending on the program and the timing of your withdrawal. Generally, full refunds are available within the first 7 days of enrollment. After that period, partial refunds may be available based on the remaining program duration. Please refer to our refund policy document or contact our support team for specific details about your situation.',
        Order=4,
        IsActive=True
    )
    
    # Studying FAQs
    FAQ.objects.create(
        Category=studying_category,
        Question='What is the program schedule?',
        Answer='Program schedules vary depending on the course you enroll in. Most programs offer flexible scheduling options including full-time and part-time tracks. Full-time programs typically run 5 days a week, while part-time options are available for evenings and weekends. Detailed schedules are provided upon enrollment and can be accessed through your student portal.',
        Order=1,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=studying_category,
        Question='How do I access online learning materials?',
        Answer='All learning materials are available through our online learning management system (LMS). Once enrolled, you will receive login credentials via email to access course materials, recorded lectures, assignments, quizzes, and other resources. The platform is accessible 24/7 from any device with an internet connection.',
        Order=2,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=studying_category,
        Question='Can I study while working full-time?',
        Answer='Absolutely! Many of our programs are designed to accommodate working professionals. We offer evening classes, weekend sessions, and self-paced online options that allow you to balance your studies with your work commitments. Our flexible learning paths ensure you can progress at your own pace without compromising your career.',
        Order=3,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=studying_category,
        Question='What support is available during my studies?',
        Answer='We provide comprehensive support throughout your learning journey. This includes dedicated academic advisors, one-on-one tutoring sessions, peer study groups, career counseling services, and 24/7 technical support. Our support team is available via email, phone, live chat, and in-person during office hours.',
        Order=4,
        IsActive=True
    )
    
    # Degrees FAQs
    FAQ.objects.create(
        Category=degrees_category,
        Question='What certifications will I receive?',
        Answer='Upon successful completion of your program, you will receive an official certificate or diploma recognized by relevant industry bodies and accreditation organizations. The specific certification depends on your program and may include professional credentials, digital badges, and LinkedIn-verified certificates that you can share with employers.',
        Order=1,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=degrees_category,
        Question='Is the degree internationally recognized?',
        Answer='Yes, our degrees and certificates are internationally recognized and accredited by relevant educational authorities and professional bodies. We maintain partnerships with leading global institutions and industry organizations to ensure our credentials are valued by employers worldwide.',
        Order=2,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=degrees_category,
        Question='What are the admission requirements?',
        Answer='Admission requirements vary by program but typically include a high school diploma or equivalent for undergraduate programs, and a bachelor\'s degree for graduate programs. Some programs may require transcripts, letters of recommendation, a personal statement, and relevant work experience. Specific requirements are listed on each program\'s page.',
        Order=3,
        IsActive=True
    )
    
    FAQ.objects.create(
        Category=degrees_category,
        Question='Can I pursue multiple programs simultaneously?',
        Answer='In most cases, you can enroll in multiple programs simultaneously, subject to scheduling compatibility and approval from your academic advisor. We recommend consulting with an advisor to ensure you can effectively manage the combined workload and meet all program requirements without compromising the quality of your learning experience.',
        Order=4,
        IsActive=True
    )


def remove_faq_data(apps, schema_editor):
    FAQCategory = apps.get_model('app', 'FAQCategory')
    FAQ = apps.get_model('app', 'FAQ')
    
    FAQ.objects.all().delete()
    FAQCategory.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_faqcategory_faq'),
    ]

    operations = [
        migrations.RunPython(create_faq_data, remove_faq_data),
    ]
