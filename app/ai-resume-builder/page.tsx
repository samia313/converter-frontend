import ToolLandingLayout from '@/components/tool-landing-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Resume Builder Online | Create a Professional Resume | PDFilio',
  description: 'Create and refine professional resumes with AI assistance. Improve wording, organize experience, and tailor your resume to supported job requirements.',
  keywords: ['AI resume builder', 'AI resume generator', 'resume builder online', 'professional resume builder', 'ATS resume'],
  alternates: { canonical: 'https://pdfilio.com/ai-resume-builder' },
  openGraph: { title: 'AI Resume Builder Online | Create a Professional Resume | PDFilio', description: 'Create and refine a professional resume with AI assistance, templates, and job-focused wording.', url: 'https://pdfilio.com/ai-resume-builder', type: 'website' },
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
      mainContent={`AI Resume Builder helps you create and refine professional resumes with AI-assisted wording, structure, and job-focused content. ATS compatibility depends on the template, formatting, employer system, and job requirements.

Choose from professionally designed templates, customize with your information, and let AI enhance your content. Optimize keywords for job titles, highlight achievements effectively, and present your best professional self.

Create tailored resume drafts for different positions and review the result before applying. Available templates, export formats, usage limits, pricing, and account requirements depend on the current product configuration.`}
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
          a: 'Available editing controls depend on the current builder interface. Use the editor controls shown in the tool to add, remove, or rearrange supported sections.'
        },
        {
          q: 'What export formats available?',
          a: 'Available export formats depend on the current tool configuration. Use the export options shown in the editor.'
        },
        {
          q: 'Do you provide keywords for my field?',
          a: 'AI can suggest relevant wording and keywords based on the job information you provide, when that feature is available.'
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
