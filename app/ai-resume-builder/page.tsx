import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Resume Builder Online | Create a Professional Resume | PDFilio',
  description: 'Create and refine professional resumes with AI assistance. Improve wording, organize experience, and tailor your resume to supported job requirements.',
  keywords: ['AI resume builder', 'resume builder', 'AI resume generator', 'professional resume builder', 'ATS resume'],
};

export default function AIResumeBuilderPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Resume Builder',
    description: 'AI-powered professional resume creation tool',
    applicationCategory: 'Utility',

  };

  return (
    <ToolLandingLayout
      toolName="AI Resume Builder"
      toolSlug="ai-resume-builder"
      description="Create and refine professional resumes with AI assistance. Improve wording, organize experience, and tailor your resume to supported job requirements."
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
      testimonials={[]}
      features={[
        'AI-powered content suggestions',
        'Professional resume templates',
        'ATS-aware resume formatting',
        'Keyword optimization',
        'Multiple export formats',
        'Customizable designs',
        'Unlimited resume creation',
        'Mobile-responsive editing',
      ]}
      benefits={[
        'Stand out to employers',
        'Improve resume structure and readability',
        'Professional appearance',
        'Save time creating resumes',
        'Optimize for job descriptions',
        'Multiple versions for different jobs',
        'Prepare tailored versions for different applications',
        'Confidence in job applications',
      ]}
      faqs={[
        {
          q: 'How does AI help with resume building?',
          a: 'AI can suggest clearer professional language, help highlight relevant achievements, and tailor wording to a job description when those features are available.'
        },
        {
          q: 'Are templates ATS-friendly?',
          a: 'Templates can be designed with ATS-friendly structure in mind, but no resume format can guarantee acceptance or passage through every employer ATS.'
        },
        {
          q: 'Can I create multiple resumes?',
          a: 'The available number of resumes depends on the current product configuration and limits shown in the tool.'
        },
        {
          q: 'How do I customize templates?',
          a: 'Drag-and-drop editor makes customization easy. Add, remove, or rearrange sections instantly.',
        },
        {
          q: 'What export formats available?',
          a: 'Available export formats depend on the current tool configuration. Use the export options shown in the editor.'
        },
        {
          q: 'Do you provide keywords for my field?',
          a: 'Yes! AI suggests industry-specific keywords to optimize for job postings.',
        },
        {
          q: 'Can I track ATS compatibility?',
          a: 'ATS compatibility depends on the template, formatting, job system, and employer requirements. Review the generated resume before submitting it.'
        },
        {
          q: 'Help with job-specific resumes?',
          a: 'Yes! Customize resumes per job description for maximum relevance and impact.',
        },
        {
          q: 'Is AI Resume Builder free?',
          a: 'Current pricing, usage limits, and export availability depend on the product configuration shown in PDFilio.'
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
      primaryKeyword="AI resume builder"
      secondaryKeywords={['resume generator', 'professional resume', 'ATS resume', 'free resume builder']}
    />
  );
}
