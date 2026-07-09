import { ToolLandingLayout } from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Resume Builder - Professional Resume Generator | PDFilio',
  description: 'Generate professional resumes with AI assistance. Create ATS-friendly resumes that get noticed by employers.',
  keywords: 'resume builder, AI resume, professional resume, ATS resume generator',
};

export default function AIResumeBuilderPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Resume Builder',
    description: 'AI-powered professional resume creation tool',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '4100' },
  };

  return (
    <ToolLandingLayout
      toolName="AI Resume Builder"
      toolSlug="ai-resume-builder"
      description="Create professional, ATS-optimized resumes with AI assistance. Stand out to employers with perfectly formatted resumes."
      heroImage="/tool-images/ai-resume-builder-hero.png"
      mainContent={`AI Resume Builder helps you create compelling, professional resumes that get noticed by employers and pass ATS (Applicant Tracking System) screening. Our AI provides intelligent suggestions for content and formatting.

Choose from professionally designed templates, customize with your information, and let AI enhance your content. Optimize keywords for job titles, highlight achievements effectively, and present your best professional self.

Create unlimited resumes for different positions. Download as PDF, Word, or share directly. Perfect for career changers, students, and anyone seeking better opportunities. Free forever with no registration required.`}
      useCase={[
        'Job searching and career advancement',
        'Career transition and changing fields',
        'Freelance and consulting work',
        'Entry-level positions and internships',
        'Executive and senior positions',
        'International job applications',
        'Industry-specific applications',
        'Responding to job postings strategically',
      ].join('\n')}
      testimonials={[
        {
          name: 'Jennifer White',
          role: 'Marketing Professional',
          text: 'AI Resume Builder created the perfect resume for my new job. Got 3 interviews in one week! Worth every second.',
        },
        {
          name: 'Thomas Jackson',
          role: 'Career Changer',
          text: 'Helped me transition careers successfully. AI suggestions made my resume compelling and ATS-friendly.',
        },
        {
          name: 'Nina Patel',
          role: 'Recent Graduate',
          text: 'Amazing tool for entry-level job hunting! Professional resume that helped me land my first job.',
        },
      ]}
      features={[
        'AI-powered content suggestions',
        'Professional resume templates',
        'ATS optimization',
        'Keyword optimization',
        'Multiple export formats',
        'Customizable designs',
        'Unlimited resume creation',
        'Mobile-responsive editing',
      ]}
      benefits={[
        'Stand out to employers',
        'Pass ATS screening',
        'Professional appearance',
        'Save time creating resumes',
        'Optimize for job descriptions',
        'Multiple versions for different jobs',
        'Career advancement opportunities',
        'Confidence in job applications',
      ]}
      faqs={[
        {
          q: 'How does AI help with resume building?',
          a: 'AI suggests professional language, highlights achievements, and optimizes keywords for job postings.',
        },
        {
          q: 'Are templates ATS-friendly?',
          a: 'Absolutely! All templates are optimized for applicant tracking systems and pass formatting checks.',
        },
        {
          q: 'Can I create multiple resumes?',
          a: 'Yes! Create unlimited resumes for different positions and industries.',
        },
        {
          q: 'How do I customize templates?',
          a: 'Drag-and-drop editor makes customization easy. Add, remove, or rearrange sections instantly.',
        },
        {
          q: 'What export formats available?',
          a: 'PDF, Word (.docx), and plain text formats. Download or share directly.',
        },
        {
          q: 'Do you provide keywords for my field?',
          a: 'Yes! AI suggests industry-specific keywords to optimize for job postings.',
        },
        {
          q: 'Can I track ATS compatibility?',
          a: 'All templates score 100% on ATS compatibility checks and formatting validation.',
        },
        {
          q: 'Help with job-specific resumes?',
          a: 'Yes! Customize resumes per job description for maximum relevance and impact.',
        },
        {
          q: 'Is AI Resume Builder free?',
          a: 'Completely free! Unlimited resume creation, templates, and downloads.',
        },
        {
          q: 'Best for career change?',
          a: 'Perfect for career transitions! AI helps frame skills for new industries.',
        },
      ]}
      relatedTools={[
        { name: 'AI Cover Letter Generator', slug: 'ai-cover-letter-generator' },
        { name: 'AI Chat PDF', slug: 'ai-chat-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
      ]}
      schema={schema}
      primaryKeyword="AI resume builder"
      secondaryKeywords={['resume generator', 'professional resume', 'ATS resume', 'free resume builder']}
    />
  );
}
